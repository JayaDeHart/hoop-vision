"use client";

import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

type Props = {};

function SignOut({}: Props) {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
}

export default SignOut;
