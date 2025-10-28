import { create } from "zustand";

interface ReportOption {
  id: number;
  category: string;
}

interface ReportProviderDialogState {
  showReportDialog: boolean;
  dialogProviderName: string;
  dialogProviderCode: string;
  reportOptions: ReportOption[];
  
  setShowReportDialog: (value: boolean) => void;
  setDialogProviderName: (name: string) => void;
  setDialogProviderCode: (code: string) => void;
  setReportOptions: (options: ReportOption[]) => void;
  
  resetReportDialog: () => void;
}

const useReportProviderDialogStore = create<ReportProviderDialogState>((set) => ({
  showReportDialog: false,
  dialogProviderName: "",
  dialogProviderCode: "",
  reportOptions: [],
  
  setShowReportDialog: (value: boolean) =>
    set({ showReportDialog: value }),
  
  setDialogProviderName: (name: string) =>
    set({ dialogProviderName: name }),
  
  setDialogProviderCode: (code: string) =>
    set({ dialogProviderCode: code }),
  
  setReportOptions: (options: any[]) =>
    set({ reportOptions: options }),
  
  resetReportDialog: () =>
    set({
      showReportDialog: false,
      dialogProviderName: "",
      dialogProviderCode: "",
      reportOptions: [],
    }),
}));

export default useReportProviderDialogStore;
