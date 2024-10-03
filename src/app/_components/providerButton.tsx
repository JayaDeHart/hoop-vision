"use client";

import { type ClientSafeProvider, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

type Props = {
  provider: ClientSafeProvider;
};

export default function ProviderButton({ provider }: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  return (
    <button
      className="w-full rounded-md border border-zinc-300 bg-white py-1 text-zinc-700"
      onClick={() => signIn(provider.id, { callbackUrl: callbackUrl })}
    >
      Sign in with {provider.name}
    </button>
  );
}
