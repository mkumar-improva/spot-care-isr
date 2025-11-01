"use client";
import React, { HTMLAttributes, FC } from "react";
import RenderRatingFilter from "./render-rating-filter";
import { Filters } from "@/types/filter-props";
import RenderSortFilter from "./render-sort-filter";

interface TabFiltersProps {
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const TabFilters: FC<TabFiltersProps> = ({ className = "" }) => {
  return (
    <div className={`flex ${className} pt-[0] md:pt-0`}>
      <div className="flex gap-[.5rem] sm:gap-[1rem] xl:gap-[1rem] flex-wrap">
        <div className="hidden lg:flex gap-[.5rem] sm:gap-[1rem] xl:gap-[1rem] flex-nowrap">
          <RenderRatingFilter />
          <RenderSortFilter />
        </div>
      </div>
    </div>
  );
};

export default TabFilters;
