import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle as postgresDrizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/server/db/schema";
import { eq } from "drizzle-orm";
import { expect } from "chai";
import { execSync } from "child_process";
import { initialzieDb } from "./util";
import { game } from "./util";

describe("The DB", () => {
  it("Should be able to insert records", async () => {
    const db = await initialzieDb();

    await db.insert(schema.users).values([{ email: "test@test.com", id: "1" }]);
    await db.insert(schema.games).values([{ ...game }]);
    await db.insert(schema.bets).values([
      {
        amount: 1,
        chosenTeam: "home",
        gameId: "1",
        odds: 1,
        userId: "1",
        id: "1",
        payout: 0,
        result: "pending",
      },
    ]);

    const bets = await db
      .select()
      .from(schema.bets)
      .where(eq(schema.bets.odds, 1));

    expect(bets).to.have.lengthOf(1);
  }).timeout(10000);
});
