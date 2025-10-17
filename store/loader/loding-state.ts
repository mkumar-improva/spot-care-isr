import { create } from "zustand";

type State = {
  loading: boolean;
  isWishlistLoaded: boolean;
};

type Action = {
  setLoading: (loading: boolean) => void;
  setIsWishlistLoaded: (loaded: boolean) => void;
};

const useLoadingState = create<State & Action>((set) => ({
  loading: false,
  isWishlistLoaded: false,
  setLoading: (loading) => set({ loading }),
  setIsWishlistLoaded: (loaded) => set({ isWishlistLoaded: loaded }),
}));

export default useLoadingState;
