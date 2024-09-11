import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "~/server/db";
import { bets } from "~/server/db/schema";
import { type InferInsertModel } from "drizzle-orm";
export const betsRouter = createTRPCRouter({
  placeBet: protectedProcedure
    .input(
      z.object({
        team: z.string(),
        amount: z.number(),
        game: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { session } = ctx;

        type Bet = InferInsertModel<typeof bets>;
        const bet: Bet = {
          userId: session.user.id,
          gameId: input.game,
          amount: input.amount,
          chosenTeam: input.team,
        };
        await db.insert(bets).values(bet);
      } catch (e) {
        throw new Error("Failed to input bet");
      }
    }),
});
