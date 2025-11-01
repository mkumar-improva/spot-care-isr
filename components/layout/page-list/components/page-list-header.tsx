"use client";
import React, { FC } from "react";
import Pagination from "./pagination";
import TabFilters from "./tab-filters";
import { Filters } from "@/types/filter-props";
import usePageListUIStore from "@/store/ui/page-list-ui-store";
import AdvanceSearch from "./advance-search";

interface PageListHeaderProps {
  totalCount: number;
}

const PageListHeader: FC<PageListHeaderProps> = ({ totalCount }) => {
  //store
  const { isSearchFocused } = usePageListUIStore();

  return (
    <div
      className="w-full flex flex-row  items-center 
    justify-between 2xl-custom:w-[59%] flex-wrap min-w-0"
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
          ${isSearchFocused ? "lg:ml-auto mid-lg:ml-0" : "lg:ml-auto mid-lg:ml-0"}`}
      >
        <Pagination className="opacity-100 max-h-[100px]" pageCount={10} />
      </div>
    </div>
  );
};

export default PageListHeader;
