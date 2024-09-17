import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { games, bets, userTokens } from "~/server/db/schema";
import { eq, sql, and, inArray } from "drizzle-orm";
import { getGamesWithOdds } from "~/app/api/third-party/basketball-api";
import { type InferInsertModel } from "drizzle-orm";
import { getWinningTeam } from "~/app/api/third-party/basketball-api";

export const gamesRouter = createTRPCRouter({
  updateGames: publicProcedure
    .input(z.object({ triggerManualUpdate: z.boolean().optional() }))
    .mutation(async ({ input }) => {
      const { triggerManualUpdate = false } = input;
      try {
        const gamesWithOdds = await getGamesWithOdds(triggerManualUpdate);

        for (const { game, odds } of gamesWithOdds) {
          const existingGame = await db
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
              await db
                .update(games)
                .set({
                  status: game.status.short,
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
              teamA: game.teams.home.name,
              teamB: game.teams.away.name,
              oddsTeamA: homeOdds,
              oddsTeamB: awayOdds,
              gameDate: new Date(game.date),
              status: game.status.short,
              winner: getWinningTeam(game).winner,
              gameData: game,
            };

            await db.insert(games).values(gameData);
          }
        }

        // get pending bets that match with completed games

        const completedGames = gamesWithOdds.filter(
          ({ game }) => game.status.short === "FT",
        );

        const completedGameIds = completedGames.map(({ game }) =>
          String(game.id),
        );

        const unfinishedBets = await db
          .select()
          .from(bets)
          .where(
            and(
              eq(bets.result, "pending"), // Check if the bet result is pending
              inArray(bets.gameId, completedGameIds), // Check if the gameId is in the list of completedGameIds
            ),
          );

        await Promise.all(
          unfinishedBets.map(async (bet) => {
            const game = completedGames.find(
              ({ game }) => String(game.id) === bet.gameId,
            );
            if (game) {
              const winner = getWinningTeam(game.game);
              if (winner.winner === bet.chosenTeam) {
                const odds = game.odds.bet?.values.find(
                  (bet) => bet.value === winner.position,
                );
                if (odds) {
                  const payout = bet.amount * Number(odds.value);

                  // update bet with win + payout
                  await db
                    .update(bets)
                    .set({
                      result: "win",
                      payout: payout,
                    })
                    .where(eq(bets.id, bet.id));

                  // update user tokens with payout
                  const tokens = await db
                    .select()
                    .from(userTokens)
                    .where(eq(userTokens.userId, bet.userId));
                  if (tokens[0]) {
                    const newTokens = tokens[0].tokens + payout;
                    await db
                      .update(userTokens)
                      .set({ tokens: newTokens })
                      .where(eq(userTokens.userId, bet.userId));
                  }
                }
              } else {
                // update bet with loss
                await db
                  .update(bets)
                  .set({
                    result: "loss",
                    payout: 0,
                  })
                  .where(eq(bets.id, bet.id));
              }
            }
          }),
        );

        //map through unfinished bets
        //update each bet with win or loss
        //update user tokens in case of win

        return { success: true, games: gamesWithOdds };
      } catch (error) {
        console.error("Error updating games:", error);
        throw new Error("Failed to update games.");
      }
    }),
});
