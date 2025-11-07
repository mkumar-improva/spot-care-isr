"use client";

import { useRef, useState, useEffect } from "react";
import useSearchUiStore from "store/ui/search-ui-store";
import useSearchDataStore from "store/data/search-data-store";
import useHeaderUiStore from "store/ui/header-ui-store";
import { Services } from "@/services/service";
import { parseProviderResults } from "@/utils/makers";
import useLoadingState from "store/loader/loding-state";
import toast from "react-hot-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert01Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import HeroSearchCustomToast from "@/components/ui/toast/hero-search-custom-toast";
import { useRouter } from "next/navigation";

const useProviderInputType = () => {
  const router = useRouter();
  /*--Begining of refs----------*/
  const inputRef = useRef<HTMLInputElement>(null);
  /*----------End of refs----------*/

  /*----------Begining of state ----------*/
  const [onFocus, setOnFocus] = useState(false);
  /*----------End of state ----------*/

  /*----------Begining of Store Import----------*/
  const { isHomePage, setShowHeroSearch } = useHeaderUiStore();
  const { loading, setLoading } = useLoadingState();
  //End of store import

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
  const { searchCurrentLocation } = useSearchDataStore();
  /*----------End of Store Import----------*/

  //const values
  const placeHolder = "Provider";
  const desc = "Search provider by name";

  //handlers

  useEffect(() => {
    const handler = setTimeout(async () => {
      const query = searchProviderName.trim();
      if (query === "") {
        setProviderIsRecord(true);
        setProviderNameDebounce([]);
        return;
      }
      setProviderIsRecord(true);
      setProviderNameDebounce([]);
      try {
        const result = await Services.SearchByProviderName(
          query,
          10,
          1,
          false,
          searchCurrentLocation?.lat ?? 0.0,
          searchCurrentLocation?.lng ?? 0.0
        );
        const filterData = {
          searchText: query,
          careType: "",
          lat: searchCurrentLocation?.lat ?? 0.0,
          lon: searchCurrentLocation?.lng ?? 0.0,
          postalCode: storePostalCode ?? "",
          radius: "30",
          pageSize: 1000,
          headerType: "",
        };
        if (result && result.length > 0) {
          setProviderIsRecord(false);
          setProviderNameError(false);
          parseProviderResults(result, filterData).then((result) => {
            setProviderNameDebounce(result);
          });
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
      setProviderNameDebounce([]);
    }
    setSearchProviderName(value);
  };

  const handleClearData = () => {
    setSearchProviderName("");
    setProviderIsRecord(false);
    setProviderNameDebounce([]);
    inputRef.current?.focus();
  };

  const SearchOption = () => {
    try {
      setLoading(true);
      const filterData = {
        searchText: searchProviderName ?? "",
        lat: searchCurrentLocation?.lat ?? 0.0,
        lng: searchCurrentLocation?.lng ?? 0.0,
        page: 1,
        pageSize: 1000,
        postalCode: storePostalCode ?? "",
        location: locationValue ?? "",
        filter: "recommended",
        headerType: "provider",
        ratingRange: "0-5",
      };
      if (!filterData.searchText || !filterData.postalCode) {
        toast.custom((t) => (
          <HeroSearchCustomToast
            icon={
              <HugeiconsIcon
                icon={Alert01Icon}
                className="size-10 flex-shrink-0"
                style={{ color: "#facc15", width: "2.5rem", height: "2.5rem" }}
                aria-hidden="true"
              />
            }
            description1={`Search criteria missing`}
            description2={`Enter both provider name and postal code to continue.`}
            toasttype={t}
          />
        ));
        return;
      }
      const queryParams = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filterData).map(([k, v]) => [k, String(v)])
        )
      ).toString();
      router.push(`/list?${queryParams}`);
      setProviderNameDebounce([]);
    } catch (ex) {
      console.error(ex);
      toast.custom((t) => (
        <HeroSearchCustomToast
          icon={
            <HugeiconsIcon
              icon={Alert01Icon}
              className="size-10 flex-shrink-0"
              style={{ color: "#facc15", width: "2.5rem", height: "2.5rem" }}
              aria-hidden="true"
            />
          }
          description1={`Search criteria missing`}
          description2={`Enter both provider name and postal code to continue.`}
          toasttype={t}
        />
      ));
    } finally {
      setShowHeroSearch(false);
    }
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
    loading,

    setOnFocus,
    setSearchProviderName,

    handleSpanClick,
    handleProviderNameChange,
    handleClearData,
    SearchOption,
  };
};

export default useProviderInputType;
