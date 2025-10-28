import { create } from "zustand";

interface ClaimProviderDialogState {
  showClaimProvider: boolean;
  selectedProviderCode: string;
  claimedProviders: any[];
  
  setShowClaimProvider: (value: boolean) => void;
  setSelectedProviderCode: (code: string) => void;
  setClaimedProviders: (providers: any[]) => void;
  
  resetClaimProvider: () => void;
}

const useClaimProviderDialogStore = create<ClaimProviderDialogState>((set) => ({
  showClaimProvider: false,
  selectedProviderCode: "",
  claimedProviders: [],
  
  setShowClaimProvider: (value: boolean) =>
    set({ showClaimProvider: value }),
  
  setSelectedProviderCode: (code: string) =>
    set({ selectedProviderCode: code }),
  
  setClaimedProviders: (providers: any[]) =>
    set({ claimedProviders: providers }),
  
  resetClaimProvider: () =>
    set({
      showClaimProvider: false,
      selectedProviderCode: "",
      claimedProviders: [],
    }),
}));

export default useClaimProviderDialogStore;
