import PaginationBar from "./pagination";
import Game from "./game";
import { api } from "~/trpc/server";

const GameGrid = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
  };
}) => {
  const currentGames = await api.games.getUnstartedGames();
  const page = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(currentGames.length / 6);
  const startIndex = (page - 1) * 6;
  const endIndex = startIndex + 6;
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="mb-48 grid grid-cols-1 gap-14 bg-slate-50 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {currentGames.slice(startIndex, endIndex).map((game) => (
          <Game game={game} key={game.id} />
        ))}
      </div>
      <PaginationBar page={page} totalPages={totalPages} />
    </div>
  );
};

export default GameGrid;
