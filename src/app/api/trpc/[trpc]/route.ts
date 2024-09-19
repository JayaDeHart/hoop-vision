// import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
// import { type NextRequest } from "next/server";

// import { env } from "~/env";
// import { appRouter } from "~/server/api/root";
// import { createTRPCContext } from "~/server/api/trpc";

// /**
//  * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
//  * handling a HTTP request (e.g. when you make requests from Client Components).
//  */
// const createContext = async (req: NextRequest) => {
//   return createTRPCContext({
//     headers: req.headers,
//   });
// };

// const handler = (req: NextRequest) =>
//   fetchRequestHandler({
//     endpoint: "/api/trpc",
//     req,
//     router: appRouter,
//     createContext: () => createContext(req),
//     onError:
//       env.NODE_ENV === "development"
//         ? ({ path, error }) => {
//             console.error(
//               `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
//             );
//           }
//         : undefined,
//   });

// export { handler as GET, handler as POST };

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { createCallerFactory } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handleCronJob = async (req: NextRequest) => {
  try {
    // Create a context (could be empty since it's a cron job, but you can customize it)
    const context = await createContext(req);

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
};

const handler = async (req: NextRequest) => {
  // Check if the request comes from a Vercel Cron Job
  if (req.nextUrl.pathname === "/api/update-games") {
    return handleCronJob(req);
  }

  // Handle regular tRPC requests
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });
};

export { handler as GET, handler as POST };
