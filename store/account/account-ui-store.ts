import { create } from "zustand";

interface AccountUIState {
  selectedTab: number;
}

interface AccountUIActions {
  setSelectedTab: (tab: number) => void;
}

const useAccountUIStore = create<AccountUIState & AccountUIActions>((set) => ({
  selectedTab: 0,
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));

export default useAccountUIStore;


