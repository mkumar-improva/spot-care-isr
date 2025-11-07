import { create } from "zustand";

interface ShareProviderDialogState {
  showShareDialog: boolean;
  
  setShowShareDialog: (value: boolean) => void;
  resetShareDialog: () => void;
}

const useShareProviderDialogStore = create<ShareProviderDialogState>((set) => ({
  showShareDialog: false,
  
  setShowShareDialog: (value: boolean) => set({ showShareDialog: value }),
  
  resetShareDialog: () => set({ showShareDialog: false }),
}));

export default useShareProviderDialogStore;
