import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { Providers } from "@/types/provider-details";

type State = {
  searchActiveTab: "services" | "provider";
  isMapLoaded: boolean;
  locationValue: string;
  searchProviderName: string;
  isShowCareVerticalLine: boolean;
  isShowLocationVerticalLine: boolean;
  showHeroMobileSearch: boolean;
  careTypeValue: string;
  radiusValue: string;
  storePostalCode: string;
  providerNameDebounce: Providers[] | null;
  providerNameError: boolean;
  providerIsRecord: boolean;
  servicesTag: string;
};

type Action = {
  setSearchActiveTab: (tab: State["searchActiveTab"]) => void;
  setIsMapLoaded: (loaded: boolean) => void;
  setLocationValue: (value: string) => void;
  setIsShowCareVerticalLine: (show: boolean) => void;
  setIsShowLocationVerticalLine: (show: boolean) => void;
  setSearchProviderName: (name: string) => void;
  setShowHeroMobileSearch: (show: boolean) => void;
  setCareTypeValue: (value: string) => void;
  setRadiusValue: (value: string) => void;
  setStorePostalCode: (code: string) => void;
  setProviderNameDebounce: (providers: Providers[] | null) => void;
  setProviderNameError: (error: boolean) => void;
  setProviderIsRecord: (isRecord: boolean) => void;
  setServicesTag: (tag: string) => void;
};

const useSearchUiStore = createWithEqualityFn<State & Action>()(
  (set) => ({
    searchActiveTab: "services",
    isMapLoaded: false,
    locationValue: "",
    isShowCareVerticalLine: true,
    isShowLocationVerticalLine: true,
    searchProviderName: "",
    showHeroMobileSearch: false,
    careTypeValue: "",
    radiusValue: "",
    storePostalCode: "",
    providerNameDebounce: null,
    providerNameError: false,
    providerIsRecord: true,
    servicesTag: "",
    setSearchActiveTab: (tab) => set({ searchActiveTab: tab }),
    setIsMapLoaded: (loaded) => set({ isMapLoaded: loaded }),
    setLocationValue: (value) => set({ locationValue: value }),
    setIsShowCareVerticalLine: (show) => set({ isShowCareVerticalLine: show }),
    setIsShowLocationVerticalLine: (show) =>
      set({ isShowLocationVerticalLine: show }),
    setSearchProviderName: (name) => set({ searchProviderName: name }),
    setShowHeroMobileSearch: (show) => set({ showHeroMobileSearch: show }),
    setCareTypeValue: (value) => set({ careTypeValue: value }),
    setRadiusValue: (value) => set({ radiusValue: value }),
    setStorePostalCode: (code) => set({ storePostalCode: code }),
    setProviderNameDebounce: (providers) =>
      set({ providerNameDebounce: providers }),
    setProviderNameError: (error) => set({ providerNameError: error }),
    setProviderIsRecord: (isRecord) => set({ providerIsRecord: isRecord }),
    setServicesTag: (tag) => set({ servicesTag: tag }),
  }),
  shallow // ✅ this is now valid
);

export default useSearchUiStore;
