import create from "zustand";

type State = {
  showLogin: boolean;
  showSignup: boolean;
  showForgotPassword: boolean;
};

type Actions = {
  setShowLogin: (value: boolean) => void;
  setShowSignup: (value: boolean) => void;
  setShowForgotPassword: (value: boolean) => void;
};

const useAuthUIStore = create<State & Actions>((set) => ({
  showLogin: false,
  showSignup: false,
  showForgotPassword: false,
  setShowLogin: (value: boolean) => set({ showLogin: value }),
  setShowSignup: (value: boolean) => set({ showSignup: value }),
  setShowForgotPassword: (value: boolean) => set({ showForgotPassword: value }),
}));

export default useAuthUIStore;
