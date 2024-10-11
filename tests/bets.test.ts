// import * as schema from "../src/server/db/schema";
// import { eq } from "drizzle-orm";
// import { createTRPCContext } from "../src/server/api/trpc";
// import { expect } from "chai";
// import { initializeDb } from "./util";
// import { type Session } from "next-auth";
// import { createCaller } from "../src/server/api/root";

// describe("Bets API", () => {
//   it("Should add a new test to the database when placeBet is called", async () => {
//     try {
//       const db = await initializeDb();
//       if (!db) {
//         return;
//       }

//       // Mock session data
//       const mockSession: Session = {
//         user: {
//           id: "1",
//           name: "Test User",
//           email: "testuser@example.com",
//           tokens: 1000,
//         },
//         expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
//       };

//       console.log("before test", mockSession);

//       const context = await createTRPCContext(
//         { headers: new Headers() },
//         db,
//         mockSession,
//       );
//       const caller = createCaller(context);

//       await caller.bets.placeBet({
//         amount: 10,
//         game: "123",
//         odds: 1.5,
//         team: "home",
//       });

//       const bets = await db
//         .select()
//         .from(schema.bets)
//         .where(eq(schema.bets.odds, 1.5));

//       expect(bets).to.have.lengthOf(1);
//     } catch (err) {
//       console.log("pee");
//       console.log(err);
//     }
//   }).timeout(10000);
// });
