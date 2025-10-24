import create from "zustand";
import { ToastMessage } from "@/hooks/common/use-custom-toast";

type State = {
  toasts: ToastMessage[];
};

type Action = {
  showToasts: (toasts: State["toasts"]) => void;
};

const customToastStore = create<State & Action>((set) => ({
  toasts: [],
  showToasts: (toasts) => set(() => ({ toasts: toasts })),
}));

export default customToastStore;
