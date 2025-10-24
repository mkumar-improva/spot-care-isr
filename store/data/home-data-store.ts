import create from "zustand";
import { Providers } from "@/types/provider-details";
import { PaginationDetails } from "@/types/pagination";

type State = {
  homeProviderList: Providers[];
  homeFilteredPaginatedList: Providers[];
  filteredPaginatedList: Providers[];
  paginationDetails: PaginationDetails;
  homeOriginalList: Providers[];
  homePageLocation: string;
};

type Action = {
  setHomeProviderList: (providers: Providers[]) => void;
  setHomeFilteredPaginatedList: (providers: Providers[]) => void;
  setFilteredPaginatedList: (providers: Providers[]) => void;
  setPaginationDetails: (pagination: PaginationDetails) => void;
  setHomeOriginalList: (providers: Providers[]) => void;
  setHomePageLocation: (location: string) => void;
};

const useHomeDataStore = create<State & Action>((set) => ({
  homeProviderList: [],
  homeFilteredPaginatedList: [],
  filteredPaginatedList: [],
  paginationDetails: {
    total: 0,
    currentPage: 0,
    totalPages: 0,
  },
  homeOriginalList: [],
  homePageLocation: "",
  setHomeProviderList: (providers) => set({ homeProviderList: providers }),
  setHomeFilteredPaginatedList: (providers) =>
    set({ homeFilteredPaginatedList: providers }),
  setFilteredPaginatedList: (providers) =>
    set({ filteredPaginatedList: providers }),
  setPaginationDetails: (pagination) => set({ paginationDetails: pagination }),
  setHomeOriginalList: (providers) => set({ homeOriginalList: providers }),
  setHomePageLocation: (location) => set({ homePageLocation: location }),
}));

export default useHomeDataStore;
