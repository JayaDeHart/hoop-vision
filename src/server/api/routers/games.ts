import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../../server/api/trpc";
import { db } from "~/server/db";
import { games, bets } from "../../../server/db/schema";
import { eq, and, inArray, isNotNull } from "drizzle-orm";
import { getGamesWithOdds } from "../../../app/api/_third-party/basketball-api";
import { type InferInsertModel } from "drizzle-orm";
import { getWinningTeam } from "../../../app/api/_third-party/basketball-api";
import { type GameResponse } from "../../../app/types";
import { lt } from "drizzle-orm";
import { updateBet } from "../../../lib/api/bets";

export const gamesRouter = createTRPCRouter({
  updateGames: publicProcedure
    .input(z.object({ triggerManualUpdate: z.boolean().optional() }))
    .mutation(async ({ input, ctx }) => {
      const { triggerManualUpdate = false } = input;
      try {
        const gamesWithOdds = await getGamesWithOdds(triggerManualUpdate);

        for (const { game, odds } of gamesWithOdds) {
          const existingGame = await ctx.db
            .select()
            .from(games)
            .where(eq(games.id, game.id.toString()))
            .limit(1);

          if (existingGame.length > 0) {
            // Update game status if necessary
            if (
              existingGame[0] &&
              existingGame[0].status !== game.status.short
            ) {
              await ctx.db
                .update(games)
                .set({
                  status: game.status.short,
                  winner: getWinningTeam(game).winner,
                })
                .where(eq(games.id, game.id.toString()));
            }
          } else {
            // Insert new game into the database
            const homeOdds =
              Number(
                odds.bet?.values.find((bet) => bet.value === "Home")?.odd,
              ) ?? 1;
            const awayOdds =
              Number(
                odds.bet?.values.find((bet) => bet.value === "Away")?.odd,
              ) ?? 1;
            type Game = InferInsertModel<typeof games>;

            const gameData: Game = {
              id: String(game.id),
              homeTeam: game.teams.home.name,
              awayTeam: game.teams.away.name,
              oddsHomeTeam: homeOdds,
              oddsAwayTeam: awayOdds,
              gameDate: new Date(game.date),
              status: game.status.short,
              winner: getWinningTeam(game).winner,
              gameData: game,
            };

            await ctx.db.insert(games).values(gameData);
          }
        }

        // get pending bets that match with completed games

        const completedGames = gamesWithOdds.filter(
          ({ game }) => game.status.short === "FT",
        );

        const completedGameIds = completedGames.map(({ game }) =>
          String(game.id),
        );

        const unfinishedBets = await ctx.db
          .select()
          .from(bets)
          .where(
            and(
              eq(bets.result, "pending"),
              inArray(bets.gameId, completedGameIds),
            ),
          );

        await Promise.all(
          unfinishedBets.map(async (bet) => {
            const game = completedGames.find(
              ({ game }) => String(game.id) === bet.gameId,
            );
            if (game) {
              const winner = getWinningTeam(game.game);
              await updateBet(bet, winner, ctx.db);
            }
          }),
        );

        return { success: true, games: gamesWithOdds };
      } catch (error) {
        console.error("Error updating games:", error);
        throw new Error("Failed to update games.");
      }
    }),

  getUnstartedGames: publicProcedure.query(async ({ ctx }) => {
    //sometimes games are missed by the update loop. If a game is more than a day old we can safely assume it is over and clean it up. Skip this step in dev so we're not cleaning up our seed data.

    if (process.env.NODE_ENV === "production") {
      const today = new Date();
      const oneDayAgo = new Date(today);
      oneDayAgo.setDate(today.getDate() - 1);

      const staleGames = await ctx.db
        .select()
        .from(games)
        .where(lt(games.gameDate, oneDayAgo));

      const updatedGames = staleGames.map((game) => ({
        ...game,
        status: "FT",
      }));

      await ctx.db.insert(games).values(updatedGames);
    }

    const unstartedGames = await ctx.db
      .select()
      .from(games)
      .where(
        and(
          eq(games.status, "NS"),
          isNotNull(games.oddsAwayTeam),
          isNotNull(games.oddsHomeTeam),
        ),
      );

    return unstartedGames.map((game) => ({
      ...game,
      gameData: game.gameData as GameResponse,
    }));
  }),
});
