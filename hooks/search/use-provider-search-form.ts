"use client";

import { useRef, useState } from "react";
import useSearchUiStore from "store/ui/search-ui-store";
import useSearchDataStore from "store/data/search-data-store";
import useHeaderUiStore from "store/ui/header-ui-store";
import { useOutsideAlerter } from "../common/use-outsider-click";

const useProviderSearchForm = () => {
  /*--Begining of refs----------*/
  const containerRef = useRef<HTMLDivElement>(null);
  /*----------End of refs----------*/

  /*----------Begining of state ----------*/
  const [showVerticalLine, setShowVerticalLine] = useState(true);
  const [isShowPopoOver, setIsShowPopOver] = useState(false);
  const [isRecord, setIsRecord] = useState(true);
  const [error, setError] = useState(false);
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
  const handleOnClick = (code: string, distanceInMiles: number) => {
    setProviderNameDebounce(null);
    setSearchProviderName("");
    params = {
      code: code,
      lat: currentLocation?.lat ?? 46.603354,
      lon: currentLocation?.lng ?? -74.0059728,
      distance: distanceInMiles,
    };
    console.log("Selected Provider Location Params: ", params);
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
    setShowVerticalLine,
    handleOnClick
  };
};

export default useProviderSearchForm;
