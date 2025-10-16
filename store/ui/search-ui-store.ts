import { create } from "zustand";

type State = {
  searchActiveTab: "services" | "provider";
  isMapLoaded: boolean;
  locationValue: string;
  milesRadius: string ;
  highlightedIndex: number;
};

type Action = {
  setSearchActiveTab: (tab: State["searchActiveTab"]) => void;
  setIsMapLoaded: (loaded: boolean) => void;
  setLocationValue: (value: string) => void;
  setMilesRadius: (radius: string) => void;
  setHighlightedIndex: (index: number) => void;
};

const useSearchUiStore = create<State & Action>((set) => ({
  searchActiveTab: "services" as "services",
  isMapLoaded: false,
  locationValue: "",
  milesRadius: "",
  highlightedIndex: -1,
  setSearchActiveTab: (tab) => set({ searchActiveTab: tab }),
  setIsMapLoaded: (loaded) => set({ isMapLoaded: loaded }),
  setLocationValue: (value) => set({ locationValue: value }),
  setMilesRadius: (radius) => set({ milesRadius: radius }),
  setHighlightedIndex: (index) => set({ highlightedIndex: index }),
}));

export default useSearchUiStore;
