import create from "zustand";

type State = {
  currentPage: number;
};

type Action = {
  setCurrentPage: (page: number) => void;
};

const useHomeUiStore = create<State & Action>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useHomeUiStore;
