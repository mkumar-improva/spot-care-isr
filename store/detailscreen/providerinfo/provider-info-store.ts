import { create } from "zustand";
import { Providers } from "@/types/provider-details";

type ProviderInfoState = {
  isSelected: boolean;
  savedProviderList: Providers[];
  userDetail: Record<string, string | number>;
  isLoggedIn: boolean;
  showLogin: boolean;
  isShareDialogOpen: boolean;
  dialogProviderName: string;
  dialogProviderCode: string;
  isReportDialogOpen: boolean;
  selectedProviderDetail: Providers | null;
};

type ProviderInfoActions = {
  setIsSelected: (selected: boolean) => void;
  setSavedProviderList: (list: Providers[]) => void;
  setUserDetail: (detail: Record<string, string | number>) => void;
  setIsLoggedIn: (val: boolean) => void;
  setShowLogin: (val: boolean) => void;
  setIsShareDialogOpen: (val: boolean) => void;
  setDialogProviderName: (name: string) => void;
  setDialogProviderCode: (code: string) => void;
  setIsReportDialogOpen: (val: boolean) => void;
  setSelectedProviderDetail: (p: Providers | null) => void;
};

const providerInfoStore = create<ProviderInfoState & ProviderInfoActions>(
  (set) => ({
    isSelected: false,
    savedProviderList: [],
    userDetail: {},
    isLoggedIn: false,
    showLogin: false,
    isShareDialogOpen: false,
    dialogProviderName: "",
    dialogProviderCode: "",
    isReportDialogOpen: false,
    selectedProviderDetail: null,

    setIsSelected: (selected) => set({ isSelected: selected }),
    setSavedProviderList: (list) => set({ savedProviderList: list }),
    setUserDetail: (detail) => set({ userDetail: detail }),
    setIsLoggedIn: (val) => set({ isLoggedIn: val }),
    setShowLogin: (val) => set({ showLogin: val }),
    setIsShareDialogOpen: (val) => set({ isShareDialogOpen: val }),
    setDialogProviderName: (name) => set({ dialogProviderName: name }),
    setDialogProviderCode: (code) => set({ dialogProviderCode: code }),
    setIsReportDialogOpen: (val) => set({ isReportDialogOpen: val }),
    setSelectedProviderDetail: (p) => set({ selectedProviderDetail: p }),
  })
);

export default providerInfoStore;
