"use client";

import { FC } from "react";
import AdvanceSearch from "./advance-search";
import Pagination from "./pagination";
import TabFilters from "./tab-filters";

interface PageListHeader1Props {
  totalCount: number;
  isSearchFocused: boolean;
}

const PageListHeader1: FC<PageListHeader1Props> = ({
  totalCount,
  isSearchFocused,
}) => {
  return (
    <div
      className="w-full hidden lg:flex lg:flex-row  bg-white 
    2lg:items-center z-10 2xl-custom:w-[60%] 2xl-custom:justify-between min-w-0
     gap-[1rem] flex-nowrap lg:flex-wrap mid-lg:flex-nowrap"
    >
      <div className="flex items-center justify-start gap-[1rem]">
        <h2
          className="truncate whitespace-nowrap flex-shrink-0 text-2xl 
        font-medium "
        >{`${totalCount} Providers`}</h2>
        <TabFilters />
        <div className="hidden lg:flex">
          <AdvanceSearch />
        </div>
      </div>
      <div
        className={`flex items-center justify-end gap-[1rem] transition-all duration-300 ease-in-out ml-0
          ${
            isSearchFocused
              ? "lg:ml-auto mid-lg:ml-0"
              : "lg:ml-auto mid-lg:ml-0"
          }`}
      >
        <Pagination className="opacity-100 max-h-[100px]" pageCount={10} />
      </div>
    </div>
  );
};

export default PageListHeader1;
