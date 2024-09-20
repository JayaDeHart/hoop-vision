import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Game from "./_components/game";

export default async function Home() {
  const session = await getServerAuthSession();
  const currentGames = await api.games.getUnstartedGames();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="grid grid-cols-1 gap-4 bg-slate-50 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {currentGames.map((game) => (
        <Game game={game} key={game.id} />
      ))}
    </div>
  );
}
