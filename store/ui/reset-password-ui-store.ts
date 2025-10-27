import create from "zustand";

type State = {
  showResetPassword: boolean;
};

type Actions = {
  setShowResetPassword: (value: boolean) => void;
};

const useResetPasswordUIStore = create<State & Actions>((set) => ({
  showResetPassword: false,
  setShowResetPassword: (value: boolean) => set({ showResetPassword: value }),
}));

export default useResetPasswordUIStore;
