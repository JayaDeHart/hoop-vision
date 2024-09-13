import { z } from "zod";
import { desc } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { db } from "~/server/db";
import { userTokens } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  getUserTokens: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx;
    const tokens = await db
      .select()
      .from(userTokens)
      .where(eq(userTokens.userId, session.user.id));

    return tokens;
  }),
});
