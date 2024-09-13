import { type Config } from "drizzle-kit";
import { env } from "~/env";

const isDev = process.env.NODE_ENV === "development";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: isDev ? env.POSTGRES_URL_LOCAL : env.POSTGRES_URL,
  },
  tablesFilter: ["hoop-vision_*"],
} satisfies Config;
