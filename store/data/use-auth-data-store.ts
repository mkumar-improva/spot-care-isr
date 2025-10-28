import create from "zustand";
import { UserData } from "@/types/user-data";

type State = {
  userDetail: UserData | null;
};

type Actions = {
  setUserDetail: (value: UserData | null) => void;
};

const useAuthDataStore = create<State & Actions>((set) => ({
  userDetail: null,
  setUserDetail: (value: UserData | null) => set({ userDetail: value }),
}));

export default useAuthDataStore;
