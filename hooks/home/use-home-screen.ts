"use client";
import { IpInfo } from "@/types/ip-info";
import { FC } from "react";
import useHomeDataStore from "store/data/home-data-store";
import useCacheStore from "store/data/cache-data-store";
import { Services } from "@/services/service";
import { useSearchParams } from "next/navigation";
import useSearchDataStore from "store/data/search-data-store";
import { parseProviderResults } from "@/utils/makers";
import { APP_CONSTANTS } from "@/constants/app-constants";
import { Filters } from "@/types/filter-props";

const useHomeScreen = () => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const searchKey = queryString || "Home";

  const {
    setHomeProviderList,
    setHomeFilteredPaginatedList,
    setPaginationDetails,
    setHomeOriginalList,
    setHomePageLocation,
  } = useHomeDataStore();

  const { listCache, filterCache, setListCache, setFilterCache } =
    useCacheStore();

  const { setCurrentLocation } = useSearchDataStore();

  const LoadHomeScreenList = async (locationData: IpInfo | null) => {
    try {
      //Use passed location data or fallback to stored state
      const currentLocationInfo = locationData;
      const isUS = currentLocationInfo?.location?.country === "United States";
      const lat = isUS ? currentLocationInfo?.location?.latitude : undefined;
      const lon = isUS ? currentLocationInfo?.location?.longitude : undefined;
      const city = isUS ? currentLocationInfo?.location?.city : undefined;
      const postal = isUS ? currentLocationInfo?.location?.zip : undefined;
      const fallbackLat = 40.7127753;
      const fallbackLon = -74.0059728;
      const fallbackCity = "New York";

      const hasValidCoords = typeof lat === "number" && typeof lon === "number";
      const liveRequest = hasValidCoords
        ? Services.LoadCaresForHomeScreen(lat, lon, 25, 30)
        : Promise.resolve({ total: 0, data: [] });
      const fallbackRequest = Services.LoadCaresForHomeScreen(
        fallbackLat,
        fallbackLon,
        25,
        10
      );

      //cache data handling
      if (
        listCache[searchKey] &&
        listCache[searchKey] &&
        listCache[searchKey].length > 0
      ) {
        let finalData = listCache[searchKey];
        let filterData = filterCache[searchKey];
        setCurrentLocation({ lat: filterData.lat, lng: filterData.lon });
        setPaginationDetails({
          total: finalData.length,
          currentPage: 1,
          totalPages: Math.ceil(finalData.length / 10),
        });

        let result = await parseProviderResults(finalData, filterData);
        setHomeProviderList(finalData);
        setHomeOriginalList(result);
        setHomeFilteredPaginatedList(
          result.slice(0, APP_CONSTANTS.PAGINATION_LIMIT)
        );
      } else {
        //api call data handling
        const [liveResponse, fallbackResponse] = await Promise.all([
          liveRequest,
          fallbackRequest,
        ]);
        setHomePageLocation(
          liveResponse?.total > 0 ? city ?? "" : fallbackCity
        );

        const finalData =
          liveResponse && liveResponse.total > 0
            ? liveResponse
            : fallbackResponse;

        if (liveResponse && liveResponse.total > 0) {
          const filterData: Filters = {
            radius: liveResponse.total > 0 ? "20" : "10",
            lat: liveResponse.total > 0 ? lat! : fallbackLat,
            lon: liveResponse.total > 0 ? lon! : fallbackLon,
            careType: "Skilled Nursing",
            page: 1,
            pageSize: liveResponse.total ? 100 : 25,
            postalCode: "0",
          };
          if (finalData) {
            setListCache(searchKey, finalData.data);
            setFilterCache(searchKey, filterData);
            setCurrentLocation({ lat: filterData.lat, lng: filterData.lon });
            setPaginationDetails({
              total: finalData.total,
              currentPage: 1,
              totalPages: Math.ceil(finalData.total / 10),
            });

            let result = await parseProviderResults(finalData.data, filterData);
            setHomeProviderList(result);
            setHomeOriginalList(result);
            setHomeFilteredPaginatedList(
              result.slice(0, APP_CONSTANTS.PAGINATION_LIMIT)
            );
          }
        }
      }
    } catch (error) {
      console.error("Error loading home screen list:", error);
    }
  };

  return { LoadHomeScreenList };
};

export default useHomeScreen;
