"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import usePageListUIStore from "@/store/ui/page-list-ui-store";
import { useSearchParams, usePathname } from "next/navigation";
import useProviderListDataStore from "@/store/data/use-provider-list-data-store";
import usePageListDialogStore from "@/store/dialog/page-list-dialog-store";

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
  const { isSortingDialogOpen, setIsSortingDialogOpen } =
    usePageListDialogStore();

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
    setIsRecommendedActive(filterVal?.filter?.toLowerCase() === "recommended");
    setIsRatingsActive(filterVal?.filter?.toLowerCase() === "ratings");
    setIsShortDistanceActive(filterVal?.filter?.toLowerCase() === "nearby");
    setIsLongDistanceActive(filterVal?.filter?.toLowerCase() === "faraway");
    setIsAdvanceFilterAscending(filterVal?.filter?.toLowerCase() === "a-z");
    setIsAdvanceFilterDescending(filterVal?.filter?.toLowerCase() === "z-a");
  }, [filterVal]);

  //handlers
  const sortByOptions = (key: string) => {
    setIsRecommendedActive(key.toLowerCase() === "recommended");
    setIsRatingsActive(key.toLowerCase() === "ratings");
    setIsShortDistanceActive(key.toLowerCase() === "nearby");
    setIsLongDistanceActive(key.toLowerCase() === "faraway");
    setIsAdvanceFilterAscending(key.toLowerCase() === "a-z");
    setIsAdvanceFilterDescending(key.toLowerCase() === "z-a");
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("filter", key);
    newParams.set("page", "1");
    const newUrl = `${pathname}?${newParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  const resetSortFilter = () => {
    // Set the UI states first
    setIsRecommendedActive(true);
    setIsRatingsActive(false);
    setIsShortDistanceActive(false);
    setIsLongDistanceActive(false);
    setIsAdvanceFilterAscending(false);
    setIsAdvanceFilterDescending(false);
    
    // Update URL with both filter and page reset
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("filter", "recommended");
    newParams.set("page", "1");
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
    isSortingDialogOpen,
    sortByOptions,
    setIsSortingDialogOpen,
    resetSortFilter
  };
};

export default useSortFilter;
