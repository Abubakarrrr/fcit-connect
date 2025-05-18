import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useProjectStore } from "@/store/projectStore";

export default function PaginationDemo({ page, setPage }) {
  const { pagination } = useProjectStore();
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className={"cursor-pointer"}>
          <PaginationPrevious
            onClick={() => {
              if (page > 1) {
                setPage((prev) => prev - 1);
              }
            }}
          />
        </PaginationItem>
        {pagination &&
          pagination.pages &&
          Array.from({ length: pagination.pages }).map((_, pg) => (
            <PaginationItem
              key={pg}
              className={`cursor-pointer ${
                pagination.page == pg + 1 ? "bg-gray-300 rounded-lg" : ""
              }`}
            >
              <PaginationLink
                onClick={() => {
                  setPage(pg + 1);
                }}
              >
                {pg + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem className={"cursor-pointer"}>
          <PaginationNext
            onClick={() => {
              if (page < pagination.pages) {
                setPage((prev) => prev + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
