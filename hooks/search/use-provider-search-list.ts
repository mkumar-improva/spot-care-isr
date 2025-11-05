"use client";

import { useRouter } from "next/navigation";
import useSearchUiStore from "@/store/ui/search-ui-store";
import useSearchDataStore from "@/store/data/search-data-store";
import useHeaderUiStore from "@/store/ui/header-ui-store";

export const useProviderSearchList = () => {
  const router = useRouter();
  const { searchProviderName, locationValue, setSearchActiveTab } = useSearchUiStore();
  const { currentLocation } = useSearchDataStore();
  const { setIsHomePage } = useHeaderUiStore();

  const handleProviderSearchSubmit = () => {
    if (!searchProviderName?.trim() || !locationValue?.trim()) return;

    setSearchActiveTab("provider");

    const queryParams = new URLSearchParams({
      searchText: searchProviderName.trim(), 
      providerName: searchProviderName.trim(),
      location: locationValue.trim(),
      lat: String(currentLocation?.lat ?? 46.603354),
      lon: String(currentLocation?.lng ?? -74.0059728),
      headerType: "provider" 
    });

    setIsHomePage(false);

    router.push(`/list?${queryParams.toString()}`);
  };

  return {
    handleProviderSearchSubmit
  };
};

export default useProviderSearchList;