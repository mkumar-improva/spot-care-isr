"use client";
import { useEffect, FC, useState } from "react";
import { Cares } from "@/types/care-types";
import useSearchDataStore from "store/data/search-data-store";
import useHomeDataStore from "store/data/home-data-store";
import { IpInfo } from "@/types/ip-info";
import { Providers } from "@/types/provider-details";
import { parseProviderResults } from "@/utils/makers";
import { APP_CONSTANTS } from "@/constants/app-constants";
import { Filters } from "@/types/filter-props";
import useLoadingState from "store/loader/loding-state";

interface HomeScreenData {
  providers: Providers[];
  total: number;
  location: { lat: number; lon: number; city: string };
  isUSLocation: boolean;
}

interface ClientStoreInitializerProps {
  careTypes: Cares[];
  ipInfo: IpInfo | null;
  homeScreenData: HomeScreenData | null;
}

const ClientStoreInitializerProps: FC<ClientStoreInitializerProps> = ({
  careTypes = [],
  ipInfo,
  homeScreenData,
}) => {
  //store imports
  const { setCareTypes, setIpInfo, setCurrentLocation } = useSearchDataStore();
  const { setLoading } = useLoadingState();
  const {
    setHomeProviderList,
    setHomeFilteredPaginatedList,
    setPaginationDetails,
    setHomeOriginalList,
    setHomePageLocation,
  } = useHomeDataStore();

  //state management
  const [careTypesInitialized, setCareTypesInitialized] =
    useState<boolean>(false);
  const [homeDataInitialized, setHomeDataInitialized] =
    useState<boolean>(false);

  //initialize care types
  useEffect(() => {
    if (careTypes && careTypes.length > 0 && !careTypesInitialized) {
      setCareTypes(careTypes);
      setCareTypesInitialized(true);
    }
  }, [careTypes, setCareTypes, careTypesInitialized]);

  //initialize IP info
  useEffect(() => {
    if (ipInfo) {
      setIpInfo(ipInfo);
    }
  }, [ipInfo, setIpInfo]);

  //initialize home screen data from server
  useEffect(() => {
    const initializeHomeData = async () => {
      if (homeScreenData && !homeDataInitialized) {
        const { providers, total, location, isUSLocation } = homeScreenData;

        // Set location
        setCurrentLocation({ lat: location.lat, lng: location.lon });
        setHomePageLocation(location.city);

        // Create filter data for parsing
        const filterData: Filters = {
          radius: isUSLocation ? "25" : "10",
          lat: location.lat,
          lon: location.lon,
          careType: "Skilled Nursing",
          page: 1,
          pageSize: Math.max(providers.length, 30),
          postalCode: "0",
        };

        // Parse and set providers
        const parsedProviders = await parseProviderResults(
          providers,
          filterData
        );

        setHomeProviderList(parsedProviders);
        setHomeOriginalList(parsedProviders);
        setHomeFilteredPaginatedList(
          parsedProviders.slice(0, APP_CONSTANTS.PAGINATION_LIMIT)
        );

        setPaginationDetails({
          total,
          currentPage: 1,
          totalPages: Math.ceil(total / APP_CONSTANTS.PAGINATION_LIMIT),
        });
        console.log(parsedProviders);
        setHomeDataInitialized(true);
      }
      setLoading(false);
    };

    initializeHomeData();
  }, [
    homeScreenData,
    homeDataInitialized,
    setCurrentLocation,
    setHomePageLocation,
    setHomeProviderList,
    setHomeOriginalList,
    setHomeFilteredPaginatedList,
    setPaginationDetails,
  ]);

  return null;
};

export default ClientStoreInitializerProps;
