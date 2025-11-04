import create from "zustand";

type State = {
  isTouchDevice: boolean;
};

type Actions = {
  setIsTouchDevice: (val: boolean) => void;
};

const useCommonUiStore = create<State & Actions>((set) => ({
  isTouchDevice: false,
  setIsTouchDevice: (val: boolean) => set({ isTouchDevice: val }),
}));

export default useCommonUiStore;
