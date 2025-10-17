import { create } from "zustand";

type State = {
  searchActiveTab: "services" | "provider";
  isMapLoaded: boolean;
  locationValue: string;
  isShowCareVerticalLine: boolean;
  isShowLocationVerticalLine: boolean;
};

type Action = {
  setSearchActiveTab: (tab: State["searchActiveTab"]) => void;
  setIsMapLoaded: (loaded: boolean) => void;
  setLocationValue: (value: string) => void;
  setIsShowCareVerticalLine: (show: boolean) => void;
  setIsShowLocationVerticalLine: (show: boolean) => void;
};

const useSearchUiStore = create<State & Action>((set) => ({
  searchActiveTab: "services" as "services",
  isMapLoaded: false,
  locationValue: "",
  isShowCareVerticalLine: true,
  isShowLocationVerticalLine: true,
  setSearchActiveTab: (tab) => set({ searchActiveTab: tab }),
  setIsMapLoaded: (loaded) => set({ isMapLoaded: loaded }),
  setLocationValue: (value) => set({ locationValue: value }),
  setIsShowCareVerticalLine: (show) => set({ isShowCareVerticalLine: show }),
  setIsShowLocationVerticalLine: (show) =>
    set({ isShowLocationVerticalLine: show }),
}));

export default useSearchUiStore;
