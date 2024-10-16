import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardFooter } from "~/components/ui/card";
import PaginationBar from "./pagination";

const GamesFallback = ({
  searchParams,
}: {
  searchParams: {
    page: number;
  };
}) => {
  const page = Number(searchParams.page) || 1;
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="mb-48 grid grid-cols-1 gap-14 bg-slate-50 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 6 }, (_, i) => (
          <GameSkeleton key={i} />
        ))}
      </div>
      <PaginationBar page={page} totalPages={3} />
    </div>
  );
};

export const GameSkeleton = () => {
  return (
    <div>
      <Card className="flex flex-col items-center justify-between p-10 xl:h-96 xl:w-96">
        <CardHeader className="p-2">
          <div className="flex items-center justify-center gap-2">
            <Skeleton className="h-12 w-20" />
          </div>
          <CardTitle className="flex items-baseline justify-center gap-24">
            <Skeleton className="h-24 w-56" />
          </CardTitle>
        </CardHeader>
        <CardFooter className="relative z-10 flex flex-col">
          <Skeleton className="mt-5 h-12 w-32" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default GamesFallback;
