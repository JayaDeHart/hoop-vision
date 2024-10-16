import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { Suspense } from "react";
import GamesFallback from "./_components/gamesFallback";
import GameGrid from "./_components/gameGrid";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page: number;
  };
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <Suspense fallback={<GamesFallback searchParams={searchParams} />}>
      <GameGrid searchParams={searchParams} />
    </Suspense>
  );
}
