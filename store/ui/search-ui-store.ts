import { create } from "zustand";

type State = {
  searchActiveTab: "services" | "provider";
};

type Action = {
  setSearchActiveTab: (tab: State["searchActiveTab"]) => void;
};

const useSearchUiStore = create<State & Action>((set) => ({
  searchActiveTab: "services",
  setSearchActiveTab: (tab) => set({ searchActiveTab: tab }),
}));

export default useSearchUiStore;
