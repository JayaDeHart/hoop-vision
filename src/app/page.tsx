// import { LatestPost } from "~/app/_components/post";
// import { api, HydrateClient } from "~/trpc/server";
// import SignOut from "./_components/signout";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { getGamesWithOdds } from "./api/third-party/basketball-api";
import Game from "./_components/game";

export default async function Home() {
  const session = await getServerAuthSession();
  const gamesWithOdds = await getGamesWithOdds();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {gamesWithOdds.slice(-12).map(([game, odds]) => (
        <Game game={game} key={game.id} odds={odds} />
      ))}
    </div>
  );
}
