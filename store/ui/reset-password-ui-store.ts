import create from "zustand";

type State = {
  showResetPassword: boolean;
  resetPasswordToken: string;
};

type Actions = {
  setShowResetPassword: (value: boolean) => void;
  setResetPasswordToken: (token: string) => void;
};

const useResetPasswordUIStore = create<State & Actions>((set) => ({
  showResetPassword: false,
  resetPasswordToken: "",
  setResetPasswordToken: (token: string) => set({ resetPasswordToken: token }),
  setShowResetPassword: (value: boolean) => set({ showResetPassword: value }),
}));

export default useResetPasswordUIStore;
