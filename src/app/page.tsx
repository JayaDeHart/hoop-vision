// import { LatestPost } from "~/app/_components/post";
// import { api, HydrateClient } from "~/trpc/server";
// import SignOut from "./_components/signout";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Game from "./_components/game";
import { Button } from "~/components/ui/button";
import UpdateButton from "./_components/updateButton";

export default async function Home() {
  const session = await getServerAuthSession();
  const gamesWithOdds = await api.games.updateGames({});
  const isDev = process.env.NODE_ENV === "development";

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {gamesWithOdds.games.slice(-12).map(({ game, odds }) => (
        <Game game={game} key={game.id} odds={odds} />
      ))}

      {isDev && <UpdateButton />}
    </div>
  );
}
