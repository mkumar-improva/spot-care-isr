import { create } from "zustand";

type State = {
  showHeroSearch: boolean;
  isHomePage: boolean;
};

type Action = {
  setShowHeroSearch: (show: State["showHeroSearch"]) => void;
  setIsHomePage: (isHome: State["isHomePage"]) => void;
};

const useHeaderUiStore = create<State & Action>((set) => ({
  showHeroSearch: false,
  isHomePage: true,
  setShowHeroSearch: (show) => set({ showHeroSearch: show }),
  setIsHomePage: (isHome) => set({ isHomePage: isHome }),
}));

export default useHeaderUiStore;
