import { create } from "zustand";

type State = {
  showLogin: boolean;
  showSignup: boolean;
  showForgotPassword: boolean;
  isLoggedIn: boolean;
  profileImage: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  isAuthLoading: boolean;
};

type Actions = {
  setShowLogin: (value: boolean) => void;
  setShowSignup: (value: boolean) => void;
  setShowForgotPassword: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
  setProfileImage: (value: string) => void;
  setUserName: (value: string) => void;
  setEmail: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setIsAuthLoading: (value: boolean) => void;
};

const useAuthUIStore = create<State & Actions>((set) => ({
  showLogin: false,
  showSignup: false,
  showForgotPassword: false,
  isLoggedIn: false,
  profileImage: "",
  userName: "",
  email: "",
  firstName: "",
  lastName: "",
  isAuthLoading: true,
  setShowLogin: (value: boolean) => set({ showLogin: value }),
  setShowSignup: (value: boolean) => set({ showSignup: value }),
  setShowForgotPassword: (value: boolean) => set({ showForgotPassword: value }),
  setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
  setProfileImage: (value: string) => set({ profileImage: value }),
  setUserName: (value: string) => set({ userName: value }),
  setEmail: (value: string) => set({ email: value }),
  setFirstName: (value: string) => set({ firstName: value }),
  setLastName: (value: string) => set({ lastName: value }),
  setIsAuthLoading: (value: boolean) => set({ isAuthLoading: value }),
}));

export default useAuthUIStore;
