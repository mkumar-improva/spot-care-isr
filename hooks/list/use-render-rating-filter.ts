"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import usePageListUIStore from "@/store/ui/page-list-ui-store";
import { Providers } from "@/types/provider-details";
import useProviderListDataStore from "@/store/data/use-provider-list-data-store";
import { Filters } from "@/types/filter-props";
import { useSearchParams, usePathname } from "next/navigation";
import usePageListDialogStore from "@/store/dialog/page-list-dialog-store";

type SortKey = keyof Providers;

const useRenderRatingFilter = () => {
  //hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  //refs
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  //store
  const { rangeRatings, setRangeRatings } = usePageListUIStore();
  const { providerList, filterVal, setProviderList, setFilterVal } =
    useProviderListDataStore();
  const { isCmsRatingsDialogOpen, setIsCmsRatingsDialogOpen } =
    usePageListDialogStore();

  //state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cmsRatingFilterVal, setCmsRatingFilterVal] = useState("0-5");

  //useEffect
  useEffect(() => {
    let rangeRatings = filterVal?.ratingRange
      ? filterVal.ratingRange.split("-").map(Number)
      : [0, 5];
    setRangeRatings(rangeRatings);
    setCmsRatingFilterVal(`${rangeRatings[0]}-${rangeRatings[1]}`);
  }, [filterVal, setRangeRatings]);

  //handlers
  const pageFilter = (
    originalSet: Providers[],
    filters: Filters
  ): Providers[] => {
    let setBeforeFilter = originalSet ?? [];

    let minRating = 0;
    let maxRating = 5;

    let ratingsRange = filters?.ratingRange
      ? filters.ratingRange?.split("-").map(Number)
      : [0, 5];

    if (Array.isArray(ratingsRange) && ratingsRange.length > 0) {
      [minRating, maxRating] = ratingsRange;
    }

    setBeforeFilter = setBeforeFilter.filter((marker) => {
      const rating = marker.rating?.overall ?? 0;
      return rating >= minRating && rating <= maxRating;
    });

    if (filters.searchFilter && filters.searchFilter.trim() !== "") {
      const searchText = filters.searchFilter.toLowerCase();

      setBeforeFilter = setBeforeFilter.filter((marker) =>
        marker.name.toLowerCase().includes(searchText)
      );
    }

    if (filters.filter && filters.filter === "nearby") {
      setBeforeFilter.sort(sortByValues("distanceInMiles", "asc"));
    }

    if (filters.filter && filters.filter === "a-z") {
      setBeforeFilter.sort(sortByValues("name", "asc"));
    }

    if (filters.filter && filters.filter === "z-a") {
      setBeforeFilter.sort(sortByValues("name", "desc"));
    }

    if (filters.filter && filters.filter === "ratings") {
      setBeforeFilter.sort(sortByValues("rating", "desc"));
    }

    return setBeforeFilter;
  };

  const handleRatingChange = useCallback(
    (range: number[], time: number = 400) => {
      setRangeRatings(range);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        const updatedFilters: Filters = {
          searchText: filterVal?.searchText || "",
          careType: filterVal?.careType || "",
          lat: filterVal?.lat || 0,
          lon: filterVal?.lon || 0,
          radius: filterVal?.radius || "10",
          filter: filterVal?.filter || "recommended",
          pageSize: filterVal?.pageSize || 10,
          page: filterVal?.page || 1,
          postalCode: filterVal?.postalCode || "",
          headerType: filterVal?.headerType,
          ratingRange: `${range[0]}-${range[1]}`,
        };

        setFilterVal(updatedFilters);

        // ✅ sync URL update with state update
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("ratingRange", `${range[0]}-${range[1]}`);
        newParams.set("page", "1");
        const newUrl = `${pathname}?${newParams.toString()}`;
        window.history.replaceState({}, "", newUrl);
      }, time);
    },
    [filterVal, searchParams, pathname]
  );

  const sortByValues = (key: SortKey, direction: "asc" | "desc") => {
    return (a: Providers, b: Providers): number => {
      let valueA: any;
      let valueB: any;

      if (key === "rating") {
        valueA = a.rating?.overall ?? 0;
        valueB = b.rating?.overall ?? 0;
      } else if (key === "isPreffered" || key === "isSponsored") {
        valueA = a[key] ? 1 : 0;
        valueB = b[key] ? 1 : 0;
      } else {
        valueA = a[key];
        valueB = b[key];
      }

      // Numeric sort
      if (typeof valueA === "number" && typeof valueB === "number") {
        return direction === "asc" ? valueA - valueB : valueB - valueA;
      }

      // String sort
      if (typeof valueA === "string" && typeof valueB === "string") {
        return direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Default fallback
      return 0;
    };
  };

  const resetRatingFilter = () => {
    // Reset rating range to default (0-5)
    const defaultRange = [0, 5];
    setRangeRatings(defaultRange);
    setCmsRatingFilterVal("0-5");

    // Update filter state
    const updatedFilters: Filters = {
      searchText: filterVal?.searchText || "",
      careType: filterVal?.careType || "",
      lat: filterVal?.lat || 0,
      lon: filterVal?.lon || 0,
      radius: filterVal?.radius || "10",
      filter: filterVal?.filter || "recommended",
      pageSize: filterVal?.pageSize || 10,
      page: filterVal?.page || 1,
      postalCode: filterVal?.postalCode || "",
      headerType: filterVal?.headerType,
      ratingRange: "0-5",
    };

    setFilterVal(updatedFilters);

    // Update URL to reflect the reset
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("ratingRange", "0-5");
    newParams.set("page", "1");
    const newUrl = `${pathname}?${newParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  return {
    isDialogOpen,
    cmsRatingFilterVal,
    rangeRatings,
    isCmsRatingsDialogOpen,
    setIsCmsRatingsDialogOpen,
    pageFilter,
    handleRatingChange,
    resetRatingFilter,
  };
};

export default useRenderRatingFilter;
