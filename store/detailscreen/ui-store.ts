import { create } from "zustand";
import { Providers } from "@/types/provider-details";

type State = {
  selectedProviderDetail: Providers | null;
  servicesTag?: string;
};

type Actions = {
  setSelectedProviderDetail: (provider: Providers | null) => void;
  setServicesTag: (tag: string) => void;
};

const useUIStore = create<State & Actions>((set) => ({
  selectedProviderDetail: null,
  servicesTag: undefined,
  setSelectedProviderDetail: (provider) => set({ selectedProviderDetail: provider }),
  setServicesTag: (tag) => set({ servicesTag: tag }),
}));

export default useUIStore;

