import { type DBBet, type Winner } from "../../app/types";
import { bets, userTokens } from "../../server/db/schema";
import { eq } from "drizzle-orm";
import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { type VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import type * as schema from "../../server/db/schema";

export const updateBet = async (
  bet: DBBet,
  winner: Winner,
  db: PostgresJsDatabase<typeof schema> | VercelPgDatabase<typeof schema>,
) => {
  if (winner.winner === bet.chosenTeam) {
    const odds = bet.odds;
    if (odds) {
      const payout = bet.amount * odds;

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
};
