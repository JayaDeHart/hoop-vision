import { z } from "zod";
import { desc } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { db } from "~/server/db";

export const leaderBoardRouter = createTRPCRouter({
  getTokens: publicProcedure.query(async () => {
    const users = await db.query.userTokens.findMany({
      orderBy: (userTokens) => [desc(userTokens.tokens)],
    });
    return {
      users: users,
    };
  }),

  getMaxWinnings: publicProcedure.query(async () => {
    const users = await db.query.leaderboard.findMany({
      orderBy: (leaderboard) => [desc(leaderboard.lifetimeWinnings)],
    });
    return {
      users: users,
    };
  }),
});
