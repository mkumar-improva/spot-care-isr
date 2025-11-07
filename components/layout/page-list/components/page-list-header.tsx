"use client";
import React, { FC } from "react";
import Pagination from "./pagination";
import TabFilters from "./tab-filters";
import usePageListUIStore from "@/store/ui/page-list-ui-store";
import AdvanceSearch from "./advance-search";
import PageListHeader1 from "./page-list-header1";
import PageListHeader2 from "./page-list-header2";

interface PageListHeaderProps {
  totalCount: number;
  isTabFiltersOpen: boolean;
  setIsTabFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageListHeader: FC<PageListHeaderProps> = ({
  totalCount,
  isTabFiltersOpen,
  setIsTabFiltersOpen,
}) => {
  //store
  const { isSearchFocused } = usePageListUIStore();

  return (
    <>
      <PageListHeader1
        totalCount={totalCount}
        isSearchFocused={isSearchFocused}
      />
      <PageListHeader2
        totalCount={totalCount}
        isSearchFocused={isSearchFocused}
        isTabFiltersOpen={isTabFiltersOpen}
        setIsTabFiltersOpen={setIsTabFiltersOpen}
      />
    </>
  );
};

export default PageListHeader;
