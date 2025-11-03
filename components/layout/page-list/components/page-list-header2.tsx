"use client";
import { FC } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon } from "@hugeicons-pro/core-stroke-standard/index";
import { FilterIcon } from "@hugeicons-pro/core-stroke-rounded/index";
import TabFilters from "./tab-filters";
import AdvanceMobileSearch from "./advance-mobile.search";
import Pagination from "./pagination";

interface PageListHeader2Props {
  totalCount: number;
  isSearchFocused: boolean;
  isTabFiltersOpen: boolean;
  setIsTabFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageListHeader2: FC<PageListHeader2Props> = ({
  totalCount,
  isSearchFocused,
  isTabFiltersOpen,
  setIsTabFiltersOpen,
}) => {
  return (
    <div
      className={`w-full flex lg:hidden bg-white flex-col items-start z-10 ${
        isTabFiltersOpen ? "gap-[.25rem] pb-2" : "gap-0"
      }
    `}
    >
      <div className="w-full flex items-center justify-between">
        <h2
          className="truncate whitespace-nowrap flex-shrink-0 text-2xl 
        font-medium "
        >{`${totalCount} Providers`}</h2>

        {/* filter toggle icons */}
        {isTabFiltersOpen ? (
          <HugeiconsIcon
            icon={ArrowUp01Icon}
            className="size-5 cursor-pointer"
            onClick={() => {
              setIsTabFiltersOpen(false);
            }}
          />
        ) : (
          <HugeiconsIcon
            icon={FilterIcon}
            className="size-5 cursor-pointer"
            onClick={() => {
              setIsTabFiltersOpen(true);
            }}
          />
        )}
      </div>
      {/* Mobile Tab Filters */}
      <div
        className={`w-full flex flex-col-reverse items-start md:flex-row md:items-center md:justify-between gap-[.75rem]`}
      >
        <div className="w-full md:w-fit flex items-center justify-between gap-[.5rem] flex-wrap sm:pt-1">
          <TabFilters className={`${!isTabFiltersOpen && "hidden"}`} />
          <div className="block md:hidden">
            <Pagination className={`${!isTabFiltersOpen && `hidden`}`} />
          </div>
        </div>
        {isTabFiltersOpen && <AdvanceMobileSearch />}
      </div>
      <div className="w-full hidden md:flex items-center justify-end">
        <Pagination className={`${!isTabFiltersOpen && `hidden`}`} />
      </div>
    </div>
  );
};

export default PageListHeader2;
