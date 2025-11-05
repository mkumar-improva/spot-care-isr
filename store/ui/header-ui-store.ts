import { create } from "zustand";

type State = {
  showHeroSearch: boolean;
  isHomePage: boolean;
  listHeaderHeight: number;
};

type Action = {
  setShowHeroSearch: (show: State["showHeroSearch"]) => void;
  setIsHomePage: (isHome: State["isHomePage"]) => void;
  setListHeaderHeight: (height: State["listHeaderHeight"]) => void;
};

const useHeaderUiStore = create<State & Action>((set) => ({
  showHeroSearch: false,
  isHomePage: true,
  listHeaderHeight: 0,
  setShowHeroSearch: (show) => set({ showHeroSearch: show }),
  setIsHomePage: (isHome) => set({ isHomePage: isHome }),
  setListHeaderHeight: (height) => set({ listHeaderHeight: height }),
}));

export default useHeaderUiStore;
