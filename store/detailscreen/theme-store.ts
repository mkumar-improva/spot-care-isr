import { create } from "zustand";

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
  resetTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  
  setTheme: (theme: string) =>
    set({ theme }),
  
  resetTheme: () =>
    set({ theme: "light" }),
}));

export default useThemeStore;
