"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import usePageListUIStore from "@/store/ui/page-list-ui-store";
import { useSearchParams, usePathname } from "next/navigation";
import { Filters } from "@/types/filter-props";
import useProviderListDataStore from "@/store/data/use-provider-list-data-store";

const useSortFilter = () => {
  //hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();

  //store
  const {
    isRecommendedActive,
    isRatingsActive,
    isShortDistanceActive,
    isLongDistanceActive,
    isAdvanceFilterAscending,
    isAdvanceFilterDescending,
    setIsRecommendedActive,
    setIsRatingsActive,
    setIsShortDistanceActive,
    setIsLongDistanceActive,
    setIsAdvanceFilterAscending,
    setIsAdvanceFilterDescending,
  } = usePageListUIStore();
  const { filterVal, setFilterVal } = useProviderListDataStore();
  //state
  const [sortFilterVal, setSortFilterVal] = useState("Recommended");

  const filterOptions = [
    {
      key: "recommended",
      label: "Recommended",
      subLabel: "See all the recommended providers first",
      checked: isRecommendedActive,
    },
    {
      key: "ratings",
      label: "Ratings",
      subLabel: "See all the most rated providers first",
      checked: isRatingsActive,
    },
    {
      key: "nearby",
      label: "Nearby",
      subLabel: "Find providers closest to you first",
      checked: isShortDistanceActive,
    },
    // {
    //   key: "faraway",
    //   label: "Farther Away",
    //   subLabel: "Find providers farther from you first",
    //   checked: isLongDistanceActive
    // },
    {
      key: "a-z",
      label: "Ascending",
      subLabel: "Sort by provider name (A-Z)",
      checked: isAdvanceFilterAscending,
    },
    {
      key: "z-a",
      label: "Descending",
      subLabel: "Sort by provider name (Z-A)",
      checked: isAdvanceFilterDescending,
    },
  ];
  //useEffect
  useEffect(() => {
    setSortFilterVal(
      filterOptions.find(
        (option) => option.key === (filterVal?.filter ?? "recommended")
      )?.label || "Recommended"
    );
    setIsRecommendedActive(filterVal?.filter === "recommended");
    setIsRatingsActive(filterVal?.filter === "ratings");
    setIsShortDistanceActive(filterVal?.filter === "nearby");
    setIsLongDistanceActive(filterVal?.filter === "faraway");
    setIsAdvanceFilterAscending(filterVal?.filter === "a-z");
    setIsAdvanceFilterDescending(filterVal?.filter === "z-a");
  }, [filterVal]);

  //handlers
  const sortByOptions = (key: string) => {
    setIsRecommendedActive(key === "recommended");
    setIsRatingsActive(key === "ratings");
    setIsShortDistanceActive(key === "nearby");
    setIsLongDistanceActive(key === "faraway");
    setIsAdvanceFilterAscending(key === "a-z");
    setIsAdvanceFilterDescending(key === "z-a");
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("filter", key);
    const newUrl = `${pathname}?${newParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  return {
    sortFilterVal,
    filterOptions,
    isRecommendedActive,
    isRatingsActive,
    isShortDistanceActive,
    isAdvanceFilterAscending,
    isAdvanceFilterDescending,
    sortByOptions,
  };
};

export default useSortFilter;
