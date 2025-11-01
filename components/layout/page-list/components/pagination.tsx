"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons-pro/core-stroke-sharp/index";
import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import usePagination from "@/hooks/list/use-pagintaion";

interface PaginationProps {
  className?: string;
  pageCount?: number;
  setCurrentHoverID?: React.Dispatch<React.SetStateAction<number>>;
  onPageChange?: () => void;
}

const Pagination: FC<PaginationProps> = ({
  className,
  pageCount,
  onPageChange,
}) => {
  //hooks
  const {
    currentPage,
    providerList,
    totalPages,
    handlePageChange,
    goToNextPage,
    goToPreviousPage,
    paginationItems,
  } = usePagination({
    pageCount,
    onPageChange,
  });

  return providerList && providerList.length > 0 ? (
    <nav
      className={`nc-Pagination inline-flex  text-base font-medium ${className} ml-[-5px] md:ml-0 items-center`}
    >
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`inline-flex w-6 h-6 items-center justify-center rounded-full cursor-pointer ${
          currentPage === 1
            ? "text-neutral-300"
            : "text-neutral-600 hover:bg-neutral-100"
        } ${twFocusClass()}`}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-5" />
      </button>
      {paginationItems().map((page) => (
        <span
          key={page}
          aria-current={currentPage === page ? "page" : undefined}
          className={`inline-flex w-8 h-8 items-center justify-center rounded-full cursor-pointer 
            text-sm sm:text-base  ${
              currentPage === page
                ? "text-primary-500 bg-transparent font-extrabold"
                : "border-0 font-semibold"
            } ${twFocusClass()}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </span>
      ))}

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`inline-flex w-6 h-6 items-center justify-center rounded-full cursor-pointer ${
          currentPage === totalPages
            ? "text-neutral-300"
            : "text-neutral-600 hover:bg-neutral-100"
        } ${twFocusClass()}`}
      >
        <HugeiconsIcon icon={ArrowRight01Icon} className="size-5" />
      </button>
    </nav>
  ) : (
    <div></div>
  );
};

export default Pagination;
