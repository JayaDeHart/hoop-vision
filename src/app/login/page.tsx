import React from "react";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";

type Props = {};

async function LoginPage({}: Props) {
  const session = await getServerAuthSession();

  return (
    <div>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
}

export default LoginPage;
