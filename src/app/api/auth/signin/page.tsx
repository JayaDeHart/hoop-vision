import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { getProviders } from "next-auth/react";
import ProviderButton from "~/app/_components/providerButton";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const providers = await getProviders();
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="mx-auto my-8 max-w-lg rounded-sm bg-zinc-100 p-8">
      <h2 className="mb-8 text-center text-2xl font-bold text-blue-400">
        Sign in
      </h2>
      <div className="flex flex-col gap-2">
        {providers ? (
          Object.values(providers).map((provider) => {
            if (provider.type === "oauth") {
              return <ProviderButton provider={provider} key={provider.id} />;
            }
          })
        ) : (
          <p>No providers found.</p>
        )}
      </div>
    </div>
  );
}
