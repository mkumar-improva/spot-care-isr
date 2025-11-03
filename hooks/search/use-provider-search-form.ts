"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useSearchUiStore from "store/ui/search-ui-store";
import useSearchDataStore from "store/data/search-data-store";
import useHeaderUiStore from "store/ui/header-ui-store";
import { useOutsideAlerter } from "../common/use-outsider-click";

const useProviderSearchForm = () => {
  /*--Begining of refs----------*/
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  /*----------End of refs----------*/

  /*----------Begining of state ----------*/
  const [showVerticalLine, setShowVerticalLine] = useState(true);
  const [isShowPopoOver, setIsShowPopOver] = useState(false);
  const [isRecord, setIsRecord] = useState(true);
  const [error, setError] = useState(false);
  const [providerInputFocused, setProviderInputFocused] = useState(false);
  let params: Record<string, string | number> = {};

  /*----------End of state ----------*/

  /*----------Begining of Store Import----------*/
  const {
    locationValue,
    searchProviderName,
    providerNameDebounce,
    providerNameError,
    providerIsRecord,
    setProviderNameDebounce,
    setSearchProviderName,
  } = useSearchUiStore();
  const { currentLocation } = useSearchDataStore();
  const { isHomePage } = useHeaderUiStore();
  /*----------End of Store Import----------*/

  useOutsideAlerter(containerRef, () => {
    setShowVerticalLine(true);
    setIsShowPopOver(false);
  });

  //handlers
  const handleProviderInputFocus = () => {
    setProviderInputFocused(true);
  };

  const handleProviderInputBlur = () => {
    setProviderInputFocused(false);
  };

  const handleOnClick = (
    code: string,
    distanceInMiles: number,
    providerName?: string
  ) => {
    // Close the dropdown but keep the provider name in the search bar
    setProviderNameDebounce(null);
    // Keep the provider name visible if provided
    if (providerName) {
      setSearchProviderName(providerName);
    }

    // Build query parameters
    const queryParams = new URLSearchParams({
      lat: String(currentLocation?.lat ?? 46.603354),
      lon: String(currentLocation?.lng ?? -74.0059728),
      distance: String(distanceInMiles),
    });

    // Navigate to detail screen with provider code and location params
    router.push(`/detail-screen/${code}?${queryParams.toString()}`);
  };

  return {
    containerRef,
    showVerticalLine,
    isShowPopoOver,
    isRecord,
    isHomePage,
    locationValue,
    error,
    searchProviderName,
    providerNameDebounce,
    providerNameError,
    providerIsRecord,
    providerInputFocused,
    setShowVerticalLine,
    handleOnClick,
    handleProviderInputFocus,
    handleProviderInputBlur,
  };
};

export default useProviderSearchForm;
