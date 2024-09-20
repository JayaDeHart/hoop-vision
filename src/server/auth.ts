import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
  userTokens,
} from "~/server/db/schema";

const isDev = process.env.NODE_ENV === "development";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      tokens: number;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const tokensRecord = await db
        .select({ tokens: userTokens.tokens })
        .from(userTokens)
        .where(eq(userTokens.userId, user.id))
        .limit(1);

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          tokens: tokensRecord[0]?.tokens ?? 0, // default to 0 if no record found
        },
      };
    },
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    Github({
      clientId: isDev ? env.GITHUB_CLIENT_ID_DEV : env.GITHUB_CLIENT_ID,
      clientSecret: isDev
        ? env.GITHUB_CLIENT_SECRET_DEV
        : env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      await db.insert(userTokens).values({
        userId: user.id,
        tokens: 1000,
      });
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
