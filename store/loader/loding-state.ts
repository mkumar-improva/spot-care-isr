import { create } from "zustand";

type State = {
  loading: boolean;
  isWishlistLoaded: boolean;
  homePageLoader:boolean;
};

type Action = {
  setLoading: (loading: boolean) => void;
  setIsWishlistLoaded: (loaded: boolean) => void;
  setHomePageLoader: (loader: boolean) => void;
};

const useLoadingState = create<State & Action>((set) => ({
  loading: true,
  isWishlistLoaded: false,
  homePageLoader: false,
  setLoading: (loading) => set({ loading }),
  setIsWishlistLoaded: (loaded) => set({ isWishlistLoaded: loaded }),
  setHomePageLoader: (loader) => set({ homePageLoader: loader }),
}));

export default useLoadingState;
