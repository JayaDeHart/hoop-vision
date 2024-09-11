import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { games } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { getGamesWithOdds } from "~/app/api/third-party/basketball-api";
import { type InferInsertModel } from "drizzle-orm";

export const gamesRouter = createTRPCRouter({
  updateGames: publicProcedure.mutation(async () => {
    try {
      const gamesWithOdds = await getGamesWithOdds();

      for (const [game, odds] of gamesWithOdds) {
        const existingGame = await db
          .select()
          .from(games)
          .where(eq(games.id, game.id.toString()))
          .limit(1);

        if (existingGame.length > 0) {
          // Update game status if necessary
          if (existingGame[0] && existingGame[0].status !== game.status.short) {
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
            Number(odds.bet?.values.find((bet) => bet.value === "Home")?.odd) ??
            1;
          const awayOdds =
            Number(odds.bet?.values.find((bet) => bet.value === "Away")?.odd) ??
            1;
          type Game = InferInsertModel<typeof games>;

          const gameData: Game = {
            id: String(game.id),
            teamA: game.teams.home.name,
            teamB: game.teams.away.name,
            oddsTeamA: homeOdds,
            oddsTeamB: awayOdds,
            gameDate: new Date(game.date),
            status: game.status.short,
          };

          await db.insert(games).values(gameData);
        }
      }

      return { success: true, games: gamesWithOdds };
    } catch (error) {
      console.error("Error updating games:", error);
      throw new Error("Failed to update games.");
    }
  }),
});
