"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import useLoadingState from "@/store/loader/loding-state";
import useProviderListDataStore from "@/store/data/use-provider-list-data-store";
import { Providers } from "@/types/provider-details";
import { parseProviderResults } from "@/utils/makers";
import { Filters } from "@/types/filter-props";
import useRenderRatingFilter from "./use-render-rating-filter";
import { useSearchParams } from "next/navigation";

interface useProviderListProps {
  providersList: Providers[];
  total: number;
  filterData: Filters;
}

const useProviderList = ({
  providersList,
  total,
  filterData,
}: useProviderListProps) => {
  //store
  const { loading, setLoading } = useLoadingState();
  const { filterVal, setProviderList, setFilterVal, clearProviderData } =
    useProviderListDataStore();

  //hooks
  const searchParams = useSearchParams();
  const { pageFilter } = useRenderRatingFilter();

  //refs
  const listinContainerRef = useRef<HTMLDivElement | null>(null);
  const NorecordContainerRef = useRef(null);
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [totalRecords, setTotalRecords] = useState<number>(total);

  //useEffects
  useEffect(() => {
    // Clear previous data when search params change to prevent showing stale results
    clearProviderData();
    setLoading(true);
    setFilterVal(null);
    
    const filterData = {
      searchText: "",
      careType: searchParams.get("careType") ?? "",
      lat: parseFloat(searchParams.get("lat") ?? "0"),
      lon: parseFloat(searchParams.get("lng") ?? "0"),
      page: parseInt(searchParams.get("page") ?? "1"),
      pageSize: parseInt(searchParams.get("pageSize") ?? "10"),
      postalCode: searchParams.get("postalCode") ?? "",
      radius: searchParams.get("radius") ?? "",
      location: searchParams.get("location") ?? "",
      filter: searchParams.get("filter") ?? "recommended",
      headerType: searchParams.get("headerType") ?? "services",
      ratingRange: searchParams.get("ratingRange") ?? "0-5",
      searchFilter: searchParams.get("searchFilter") ?? "",
    };

    setFilterVal(filterData);
  }, [searchParams, setFilterVal, clearProviderData, setLoading]);

  useEffect(() => {
    const run = async () => {
      // Handle empty results by clearing store and setting proper state
      if (!total || total <= 0) {
        clearProviderData();
        setTotalRecords(0);
        setLoading(false);
        return;
      }

      const result = await parseProviderResults(
        providersList,
        filterVal ?? filterData
      );
      const filteredResult = pageFilter(result, filterVal ?? filterData);
      setProviderList(filteredResult);
      setTotalRecords(filteredResult.length);
      setLoading(false);
    };

    run();
  }, [total, providersList, filterData, filterVal, clearProviderData, setLoading]);

  return {
    listinContainerRef,
    loading,
    NorecordContainerRef,
    currentHoverID,
    totalRecords,
    setCurrentHoverID,
  };
};

export default useProviderList;
