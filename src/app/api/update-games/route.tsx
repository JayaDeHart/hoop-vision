// app/api/update-games/route.ts

import { type NextRequest } from "next/server";
import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext, createCallerFactory } from "~/server/api/trpc";

export async function GET(req: NextRequest) {
  console.log("hello!!");
  console.log(req.nextUrl.pathname);

  try {
    const context = await createTRPCContext({ headers: req.headers });
    const createCaller = createCallerFactory(appRouter);
    const caller = createCaller(context);

    const result = await caller.games.updateGames({
      triggerManualUpdate: false,
    });

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error running updateGames from cron job:", error);
    return new Response(JSON.stringify({ success: false, error: "error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
