import { drizzle as vercelDrizzle } from "drizzle-orm/vercel-postgres";
import { drizzle as postgresDrizzle } from "drizzle-orm/postgres-js";
import { sql as vercelSql } from "@vercel/postgres";
import postgres from "postgres"; // for local postgres connection
import * as schema from "./schema";
import { env } from "../../env";

const isDev = process.env.NODE_ENV === "development";

export const db = isDev
  ? postgresDrizzle(postgres(env.POSTGRES_URL_LOCAL), { schema })
  : vercelDrizzle(vercelSql, { schema });

// export const db = vercelDrizzle(vercelSql, { schema });
