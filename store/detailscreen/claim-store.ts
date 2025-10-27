import { create } from "zustand";

interface ClaimState {
  showLogin: boolean;
  providerInfoDialogOpen: boolean;
  selectedProviderCode: string;
  setShowLogin: (value: boolean) => void;
  setProviderInfoDialogOpen: (value: boolean) => void;
  setSelectedProviderCode: (code: string) => void;
  resetClaim: () => void;
}

const useClaimStore = create<ClaimState>((set) => ({
  showLogin: false,
  providerInfoDialogOpen: false,
  selectedProviderCode: "",
  
  setShowLogin: (value: boolean) =>
    set({ showLogin: value }),
  
  setProviderInfoDialogOpen: (value: boolean) =>
    set({ providerInfoDialogOpen: value }),
  
  setSelectedProviderCode: (code: string) =>
    set({ selectedProviderCode: code }),
  
  resetClaim: () =>
    set({
      showLogin: false,
      providerInfoDialogOpen: false,
      selectedProviderCode: "",
    }),
}));

export default useClaimStore;
