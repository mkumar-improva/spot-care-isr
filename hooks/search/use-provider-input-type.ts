"use client";

import { useRef, useState, useEffect } from "react";
import useSearchUiStore from "store/ui/search-ui-store";
import useSearchDataStore from "store/data/search-data-store";
import useHeaderUiStore from "store/ui/header-ui-store";
import { Services } from "@/services/service";
import { parseProviderResults } from "@/utils/makers";

const useProviderInputType = () => {
  /*--Begining of refs----------*/
  const inputRef = useRef<HTMLInputElement>(null);
  /*----------End of refs----------*/

  /*----------Begining of state ----------*/
  const [onFocus, setOnFocus] = useState(false);
  /*----------End of state ----------*/

  /*----------Begining of Store Import----------*/
  const { isHomePage } = useHeaderUiStore();
  const {
    locationValue,
    searchProviderName,
    providerNameDebounce,
    storePostalCode,
    setSearchProviderName,
    setProviderNameDebounce,
    setProviderNameError,
    setProviderIsRecord,
  } = useSearchUiStore((state) => ({
    locationValue: state.locationValue,
    searchProviderName: state.searchProviderName,
    providerNameDebounce: state.providerNameDebounce,
    storePostalCode: state.storePostalCode,
    setSearchProviderName: state.setSearchProviderName,
    setProviderNameDebounce: state.setProviderNameDebounce,
    setProviderNameError: state.setProviderNameError,
    setProviderIsRecord: state.setProviderIsRecord,
  }));
  const { currentLocation } = useSearchDataStore();
  /*----------End of Store Import----------*/

  //const values
  const placeHolder = "Provider";
  const desc = "Search provider by name";

  //handlers

  useEffect(() => {
    const handler = setTimeout(async () => {
      const query = searchProviderName.trim();
      if (query === "") {
        setProviderNameDebounce([]);
        return;
      }
      try {
        const result = await Services.SearchByProviderName(
          query,
          10,
          1,
          false,
          currentLocation?.lat ?? 0.0,
          currentLocation?.lng ?? 0.0
        );
        const filterData = {
          searchText: query,
          careType: "",
          lat: currentLocation?.lat ?? 0.0,
          lon: currentLocation?.lng ?? 0.0,
          postalCode: storePostalCode ?? "",
          radius: "30",
          pageSize: 10,
          headerType: "",
        };

        if (result && result.length > 0) {
          setProviderNameError(false);
          parseProviderResults(result, filterData).then((result) => {
            setProviderNameDebounce(result);
          });
          setProviderIsRecord(true);
        } else {
          setProviderIsRecord(false);
        }
      } catch (error) {
        setProviderNameError(true);
        console.error("Error fetching Provider names:", error);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchProviderName]);

  const handleSpanClick = () => {
    inputRef.current?.focus();
  };

  const handleProviderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setProviderNameDebounce(null);
    }
    setSearchProviderName(value);
  };

  const handleClearData = () => {
    setSearchProviderName("");
    setProviderIsRecord(false)
    inputRef.current?.focus();
  };

  return {
    inputRef,
    onFocus,
    isHomePage,
    locationValue,
    placeHolder,
    desc,
    searchProviderName,
    providerNameDebounce,
    storePostalCode,

    setOnFocus,
    setSearchProviderName,

    handleSpanClick,
    handleProviderNameChange,
    handleClearData,
  };
};

export default useProviderInputType;
