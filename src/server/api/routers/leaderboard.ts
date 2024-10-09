import { desc } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const leaderBoardRouter = createTRPCRouter({
  getTokens: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.userTokens.findMany({
      orderBy: (userTokens) => [desc(userTokens.tokens)],
    });
    return {
      users: users,
    };
  }),

  getMaxWinnings: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.leaderboard.findMany({
      orderBy: (leaderboard) => [desc(leaderboard.lifetimeWinnings)],
    });
    return {
      users: users,
    };
  }),
});
