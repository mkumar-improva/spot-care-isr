import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type State = {
  searchActiveTab: "services" | "provider";
  isMapLoaded: boolean;
  locationValue: string;
  searchProviderName: string;
  isShowCareVerticalLine: boolean;
  isShowLocationVerticalLine: boolean;
  showHeroMobileSearch: boolean;
};

type Action = {
  setSearchActiveTab: (tab: State["searchActiveTab"]) => void;
  setIsMapLoaded: (loaded: boolean) => void;
  setLocationValue: (value: string) => void;
  setIsShowCareVerticalLine: (show: boolean) => void;
  setIsShowLocationVerticalLine: (show: boolean) => void;
  setSearchProviderName: (name: string) => void;
  setShowHeroMobileSearch: (show: boolean) => void;
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
    setSearchActiveTab: (tab) => set({ searchActiveTab: tab }),
    setIsMapLoaded: (loaded) => set({ isMapLoaded: loaded }),
    setLocationValue: (value) => set({ locationValue: value }),
    setIsShowCareVerticalLine: (show) => set({ isShowCareVerticalLine: show }),
    setIsShowLocationVerticalLine: (show) =>
      set({ isShowLocationVerticalLine: show }),
    setSearchProviderName: (name) => set({ searchProviderName: name }),
    setShowHeroMobileSearch: (show) => set({ showHeroMobileSearch: show }),
  }),
  shallow // ✅ this is now valid
);

export default useSearchUiStore;
