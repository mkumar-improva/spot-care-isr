import create from "zustand";
import { Providers } from "@/types/provider-details";
import { Filters } from "@/types/filter-props";

type State = {
  listCache: Record<string, Providers[]>;
  filterCache: Record<string, Filters>;
};

type Action = {
  setListCache: (key: string, value: Providers[]) => void;
  setFilterCache: (key: string, value: Filters) => void;
};

const useCacheStore = create<State & Action>((set, get) => ({
  listCache: {}, // initialize as empty object
  filterCache: {},
  setListCache: (key, value) => {
    const prev = get().listCache;
    set({
      listCache: {
        ...prev,
        [key]: value,
      },
    });
  },
  setFilterCache: (key, value) => {
    const prev = get().filterCache;
    set({
      filterCache: {
        ...prev,
        [key]: value,
      },
    });
  },
}));

export default useCacheStore;
