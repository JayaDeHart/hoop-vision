import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

type Props = {
  page: number;
  totalPages: number;
};

const PaginationBar = ({ page, totalPages }: Props) => {
  return (
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
  );
};

export default PaginationBar;
