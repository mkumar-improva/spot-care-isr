"use client";

import { useRef, useState, useEffect } from "react";
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
  const [navigatingCode, setNavigatingCode] = useState<string | null>(null);
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
    setShowHeroMobileSearch,
  } = useSearchUiStore();
  const { currentLocation } = useSearchDataStore();
  const { isHomePage } = useHeaderUiStore();
  /*----------End of Store Import----------*/

  useOutsideAlerter(containerRef, () => {
    setShowVerticalLine(true);
    setIsShowPopOver(false);
  });

  // Update isRecord when results change and clear navigation state on new searches
  useEffect(() => {
    if (providerNameDebounce && providerNameDebounce.length > 0) {
      setIsRecord(false); // Results found
    } else if (
      searchProviderName &&
      searchProviderName.trim() !== "" &&
      !navigatingCode
    ) {
      setIsRecord(true); // Searching (only if not navigating)
    }
  }, [providerNameDebounce, searchProviderName, navigatingCode]);

  // Clear navigation state when search changes
  useEffect(() => {
    if (
      searchProviderName &&
      searchProviderName.trim() !== "" &&
      navigatingCode
    ) {
      // If user is typing while navigating, clear the navigation state
      const timeoutId = setTimeout(() => {
        setNavigatingCode(null);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [searchProviderName, navigatingCode]);

  //handlers
  const handleProviderInputFocus = () => {
    setProviderInputFocused(true);
  };

  const handleProviderInputBlur = () => {
    // Add small delay to allow click events to fire before hiding dropdown
    setTimeout(() => {
      setProviderInputFocused(false);
    }, 150);
  };

  const handleOnClick = (
    code: string,
    distanceInMiles: number,
    providerName?: string
  ) => {
    // Set loading state for this specific provider
    setNavigatingCode(code);

    // Build query parameters
    const queryParams = new URLSearchParams({
      lat: String(currentLocation?.lat ?? 46.603354),
      lon: String(currentLocation?.lng ?? -74.0059728),
      distance: String(distanceInMiles),
    });

    // Navigate to detail screen with provider code and location params
    router.push(`/detail-screen/${code}?${queryParams.toString()}`);
    setShowHeroMobileSearch(false);
  };

  return {
    containerRef,
    showVerticalLine,
    isShowPopoOver,
    isHomePage,
    locationValue,
    error,
    searchProviderName,
    providerNameDebounce,
    providerNameError,
    providerIsRecord: isRecord, // Use local state instead of store state
    providerInputFocused,
    navigatingCode,
    setShowVerticalLine,
    handleOnClick,
    handleProviderInputFocus,
    handleProviderInputBlur,
  };
};

export default useProviderSearchForm;
