import create from "zustand";
import { Providers } from "@/types/provider-details";
import { Filters } from "@/types/filter-props";

type State = {
  providerList: Providers[];
  filteredPaginatedList: Providers[];
  filterVal: Filters | null;
  savedProviderList: Providers[];
};

type Action = {
  setProviderList: (list: Providers[]) => void;
  setFilteredPaginatedList: (list: Providers[]) => void;
  setFilterVal: (filters: Filters | null) => void;
  clearProviderData: () => void;
  setSavedProviderList: (list: Providers[]) => void;
};

const useProviderListDataStore = create<State & Action>((set) => ({
  providerList: [],
  filteredPaginatedList: [],
  filterVal: null,
  savedProviderList: [],
  setProviderList: (providers) => set({ providerList: providers }),
  setFilteredPaginatedList: (providers) =>
    set({ filteredPaginatedList: providers }),
  setFilterVal: (filters) => set({ filterVal: filters }),
  clearProviderData: () => set({ providerList: [], filteredPaginatedList: [] }),
  setSavedProviderList: (list) => set({ savedProviderList: list }),
}));

export default useProviderListDataStore;
