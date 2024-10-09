import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle as postgresDrizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/server/db/schema";
import { appRouter } from "../src/server/api/root";
import { eq } from "drizzle-orm";
import { createCallerFactory, createTRPCContext } from "../src/server/api/trpc";
import { expect } from "chai";
import { initialzieDb } from "./util";

describe("Bets API", () => {
  it("Should add a new test to the database when placeBet is called", async () => {
    const db = await initialzieDb();

    //I need to mock the context in a way that gives ctx a session and a user
    const context = await createTRPCContext({ headers: new Headers() }, db);
    const createCaller = createCallerFactory(appRouter);
    const caller = createCaller(context);

    await caller.bets.placeBet({
      amount: 10,
      game: "123",
      odds: 1.5,
      team: "home",
    });

    const bets = await db
      .select()
      .from(schema.bets)
      .where(eq(schema.bets.odds, 1.5));

    expect(bets).to.have.lengthOf(1);
  });
});
