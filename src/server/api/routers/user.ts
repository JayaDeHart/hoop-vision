import { z } from "zod";
import { desc } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { db } from "~/server/db";
import { userTokens } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { bets, games } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getUserTokens: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx;
    const tokens = await db
      .select()
      .from(userTokens)
      .where(eq(userTokens.userId, session.user.id));

    return tokens;
  }),

  getUserBets: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx;

    const userBetsWithGames = await db
      .select({
        bet: bets, // Select all columns from bets as 'bet'
        game: games, // Select all columns from games as 'game'
      })
      .from(bets)
      .innerJoin(games, eq(bets.gameId, games.id)) // Perform the join on the gameId
      .where(eq(bets.userId, session.user.id));

    return userBetsWithGames; // Will return an array of { bet, game }
  }),
});
