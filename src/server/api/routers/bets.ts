import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import { bets } from "../../../server/db/schema";
import { type InferInsertModel } from "drizzle-orm";
import { games, userTokens } from "../../../server/db/schema";
import { eq } from "drizzle-orm";
import {
  getGameById,
  getWinningTeam,
} from "../../../app/api/_third-party/basketball-api";
import { updateBet } from "../../../lib/api/bets";

export const betsRouter = createTRPCRouter({
  placeBet: protectedProcedure
    .input(
      z.object({
        team: z.string(),
        amount: z.number(),
        game: z.string(),
        odds: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx;

      // Check if the game exists and hasn't started
      const game = await ctx.db
        .select()
        .from(games)
        .where(eq(games.id, input.game))
        .limit(1);

      console.log(game);
      console.log(game[0]?.status);

      if (game.length === 0) {
        throw new Error("Game not found");
      }
      if (game[0] && game[0].status !== "NS") {
        throw new Error(
          "Cannot place bet on a game that has started or is completed",
        );
      }

      // Check if the user has enough tokens
      const tokens = await ctx.db
        .select()
        .from(userTokens)
        .where(eq(userTokens.userId, session.user.id))
        .limit(1);

      if (!tokens[0]) {
        throw new Error("User has no tokens");
      }

      if (input.amount > tokens[0].tokens) {
        throw new Error("Not enough tokens to place bet");
      }

      // Deduct tokens from user
      const newTokens = tokens[0].tokens - input.amount;
      await ctx.db
        .update(userTokens)
        .set({ tokens: newTokens })
        .where(eq(userTokens.userId, session.user.id));

      // Insert bet into the database
      type Bet = InferInsertModel<typeof bets>;
      const bet: Bet = {
        userId: session.user.id,
        gameId: input.game,
        amount: input.amount,
        chosenTeam: input.team,
        odds: input.odds,
      };
      try {
        await ctx.db.insert(bets).values(bet);
      } catch (e) {
        console.log(e);
        throw new Error("Failed to place bet");
      }

      return {
        tokens: newTokens,
        bet: bet,
      };
    }),

  updateBets: publicProcedure.mutation(async ({ ctx }) => {
    const unfinishedBets = await ctx.db
      .select()
      .from(bets)
      .where(eq(bets.result, "pending"));

    const unfinished = unfinishedBets.length;
    let updated = 0;

    await Promise.all(
      unfinishedBets.map(async (bet) => {
        const game = await getGameById(Number(bet.gameId));
        if (game && game.status.short === "FT") {
          const winner = getWinningTeam(game);
          await updateBet(bet, winner, ctx.db);
          updated++;
        }
      }),
    );
    console.log(`Updated ${updated} out of ${unfinished} bets`);
    return { message: `Updated ${updated} out of ${unfinished} bets` };
  }),
});

//bets workflow: check game not started, check user has enough money, deduct money from user, add bet to db, return bet
//todo: add token deduction to placeBet route
