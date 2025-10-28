import { create } from "zustand";

type State = {
  loading: boolean;
  isWishlistLoaded: boolean;
  homePageLoader: boolean;
  authLoader: boolean;
};

type Action = {
  setLoading: (loading: boolean) => void;
  setIsWishlistLoaded: (loaded: boolean) => void;
  setHomePageLoader: (loader: boolean) => void;
  setAuthLoader: (loader: boolean) => void;
};

const useLoadingState = create<State & Action>((set) => ({
  loading: true,
  isWishlistLoaded: false,
  homePageLoader: false,
  authLoader: false,
  setLoading: (loading) => set({ loading }),
  setIsWishlistLoaded: (loaded) => set({ isWishlistLoaded: loaded }),
  setHomePageLoader: (loader) => set({ homePageLoader: loader }),
  setAuthLoader: (loader) => set({ authLoader: loader }),
}));

export default useLoadingState;
