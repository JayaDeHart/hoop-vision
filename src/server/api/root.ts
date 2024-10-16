import { createCallerFactory, createTRPCRouter } from "../api/trpc";
import { leaderBoardRouter } from "./routers/leaderboard";
import { gamesRouter } from "./routers/games";
import { betsRouter } from "./routers/bets";
import { userRouter } from "./routers/user";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  leaderboard: leaderBoardRouter,
  games: gamesRouter,
  bets: betsRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
