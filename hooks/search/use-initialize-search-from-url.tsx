"use client";
import { useLayoutEffect } from "react";
import { useSearchParams } from "next/navigation";
import useSearchUiStore from "@/store/ui/search-ui-store";
import useHeaderUiStore from "@/store/ui/header-ui-store";

/**
 * Hook to initialize the search store from URL query parameters
 * Called on list page to populate search fields with user's previous selection
 */
export const useInitializeSearchFromUrl = () => {
  const searchParams = useSearchParams();
  const { setIsHomePage } = useHeaderUiStore();
  const {
    setCareTypeValue,
    setLocationValue,
    setRadiusValue,
    setStorePostalCode,
    setSearchActiveTab,
    setSearchProviderName,
  } = useSearchUiStore();

  useLayoutEffect(() => {
    setIsHomePage(false);

    const careType = searchParams.get("careType");
    const location = searchParams.get("location");
    const radius = searchParams.get("radius");
    const postalCode = searchParams.get("postalCode");
    const providerName = searchParams.get("providerName");
    const headerType = searchParams.get("headerType"); 

    if (careType) {
      setCareTypeValue(decodeURIComponent(careType));
    }

    if (location) {
      setLocationValue(decodeURIComponent(location));
    }

    if (radius) {
      setRadiusValue(decodeURIComponent(radius));
    }

    if (postalCode) {
      setStorePostalCode(decodeURIComponent(postalCode));
    }

    if (providerName) {
      setSearchProviderName(decodeURIComponent(providerName));
    }

    if (headerType === "provider") {
      setSearchActiveTab("provider");
    } else {
      setSearchActiveTab("services");
    }
  }, [searchParams, setCareTypeValue, setLocationValue, setRadiusValue, setStorePostalCode, setSearchActiveTab, setSearchProviderName, setIsHomePage]);
};
