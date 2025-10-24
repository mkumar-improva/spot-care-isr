"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons-pro/core-stroke-sharp/index";
import React, { FC } from "react";
import useHomePagination from "@/hooks/home/use-home-pagination";
import twFocusClass from "@/utils/twFocusClass";

interface HomePaginationProps {
  className?: string;
  pageCount?: number;
  setCurrentHoverID?: React.Dispatch<React.SetStateAction<number>>;
  onPageChange?: () => void;
}

const HomePagination: FC<HomePaginationProps> = ({
  className,
  pageCount,
  onPageChange,
}) => {
  const {
    homeProviderList,
    currentPage,
    totalPages,
    paginationItems,
    goToNextPage,
    goToPreviousPage,
    handlePageChange,
  } = useHomePagination({
    pageCount,
    onPageChange,
  });

  return homeProviderList && homeProviderList.length > 0 ? (
    <nav
      className={`nc-Pagination inline-flex  text-base font-medium ${className} ml-[-5px] md:ml-0`}
    >
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`inline-flex w-8 h-8 items-center justify-center rounded-full cursor-pointer ${
          currentPage === 1
            ? "text-neutral-300"
            : "text-neutral-600 hover:bg-neutral-100"
        } ${twFocusClass()}`}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={28} />
      </button>
      {paginationItems.map((page) => (
        <span
          key={page}
          aria-current={currentPage === page ? "page" : undefined}
          className={`inline-flex w-8 h-8 items-center justify-center rounded-full cursor-pointer text-[14px] sm:text-[16px] ${
            currentPage === page
              ? "bg-primary-700 text-white xs:text-primary-500 bg-transparent font-extrabold"
              : "bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 xs:border-0"
          } ${twFocusClass()}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </span>
      ))}

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`inline-flex w-8 h-8 items-center justify-center rounded-full cursor-pointer ${
          currentPage === totalPages
            ? "text-neutral-300"
            : "text-neutral-600 hover:bg-neutral-100"
        } ${twFocusClass()}`}
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={28} />
      </button>
    </nav>
  ) : (
    <div></div>
  );
};

export default HomePagination;
