"use client";

import { type ClientSafeProvider, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGithub, FaDiscord, FaGoogle } from "react-icons/fa";
import { Button } from "~/components/ui/button";

type Props = {
  provider: ClientSafeProvider;
};

const providerMap = new Map<string, JSX.Element>([
  ["github", <FaGithub className="mr-2" key="github" size={24} />],
  ["discord", <FaDiscord className="mr-2" key="discord" size={24} />],
  ["google", <FaGoogle className="mr-2" key="google" size={24} />],
]);

export default function ProviderButton({ provider }: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const Icon = providerMap.get(provider.id) ?? null;

  return (
    <Button
      onClick={() => signIn(provider.id, { callbackUrl: callbackUrl })}
      className="p-6"
    >
      {Icon}
      Sign in with {provider.name}
    </Button>
  );
}
