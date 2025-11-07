import { create } from "zustand";

type State = {
  isCmsRatingsDialogOpen: boolean;
  isSortingDialogOpen: boolean;
};

type Actions = {
  setIsCmsRatingsDialogOpen: (value: boolean) => void;
  setIsSortingDialogOpen: (value: boolean) => void;
};

const usePageListDialogStore = create<State & Actions>((set) => ({
  isCmsRatingsDialogOpen: false,
  isSortingDialogOpen: false,
  setIsCmsRatingsDialogOpen: (value: boolean) =>
    set({ isCmsRatingsDialogOpen: value }),
  setIsSortingDialogOpen: (value: boolean) =>
    set({ isSortingDialogOpen: value }),
}));

export default usePageListDialogStore;
