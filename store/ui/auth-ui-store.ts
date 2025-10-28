import create from "zustand";

type State = {
  showLogin: boolean;
  showSignup: boolean;
  showForgotPassword: boolean;
  isLoggedIn: boolean;
  profileImage: string;
};

type Actions = {
  setShowLogin: (value: boolean) => void;
  setShowSignup: (value: boolean) => void;
  setShowForgotPassword: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
  setProfileImage: (value: string) => void;
};

const useAuthUIStore = create<State & Actions>((set) => ({
  showLogin: false,
  showSignup: false,
  showForgotPassword: false,
  isLoggedIn: false,
  profileImage: "",
  setShowLogin: (value: boolean) => set({ showLogin: value }),
  setShowSignup: (value: boolean) => set({ showSignup: value }),
  setShowForgotPassword: (value: boolean) => set({ showForgotPassword: value }),
  setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
  setProfileImage: (value: string) => set({ profileImage: value }),
}));

export default useAuthUIStore;
