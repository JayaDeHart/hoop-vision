import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Game from "./_components/game";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page: number;
  };
}) {
  const session = await getServerAuthSession();
  const currentGames = await api.games.getUnstartedGames();
  const page = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(currentGames.length / 6);
  const startIndex = (page - 1) * 6;
  const endIndex = startIndex + 6;

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="mb-48 grid grid-cols-1 gap-14 bg-slate-50 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {currentGames.slice(startIndex, endIndex).map((game) => (
          <Game game={game} key={game.id} />
        ))}
      </div>
      <Pagination className="absolute bottom-12 w-full">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`/?page=${page - 1}`} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href={`/?page=${i + 1}`}
                className={
                  i + 1 === page
                    ? "bg-slate-200 text-slate-800"
                    : "text-slate-500"
                }
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href={`/?page=${page + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
