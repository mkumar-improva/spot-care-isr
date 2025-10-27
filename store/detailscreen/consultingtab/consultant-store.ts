import { create } from "zustand";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  reason: string;
  onBehalf: string;
  helpText: string;
  interestedIn: string;
};

type State = {
  formData: FormData;
  formErrors: FormData;
  activeFormIndex: number;
  acceptTerms: boolean;
  animationKey: number;
};

type Action = {
  setFormData: (formData: FormData) => void;
  setFormErrors: (formErrors: FormData) => void;
  updateFormField: (field: keyof FormData, value: string) => void;
  updateFormError: (field: keyof FormData, error: string) => void;
  setActiveFormIndex: (activeFormIndex: State["activeFormIndex"]) => void;
  setAcceptTerms: (acceptTerms: State["acceptTerms"]) => void;
  setAnimationKey: (animationKey: State["animationKey"]) => void;
  incrementAnimationKey: () => void;
  incrementActiveFormIndex: () => void;
  decrementActiveFormIndex: () => void;
  resetForm: () => void;
};

const consultantStore = create<State & Action>((set) => ({
  formData: {
    fullName: "",
    phone: "",
    email: "",
    reason: "",
    onBehalf: "",
    helpText: "",
    interestedIn: "",
  },
  formErrors: {
    fullName: "",
    phone: "",
    email: "",
    reason: "",
    onBehalf: "",
    helpText: "",
    interestedIn: "",
  },
  activeFormIndex: 0,
  acceptTerms: true,
  animationKey: 0,

  setFormData: (formData) => set({ formData }),
  setFormErrors: (formErrors) => set({ formErrors }),
  updateFormField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  updateFormError: (field, error) =>
    set((state) => ({
      formErrors: { ...state.formErrors, [field]: error },
    })),
  setActiveFormIndex: (activeFormIndex) => set({ activeFormIndex }),
  setAcceptTerms: (acceptTerms) => set({ acceptTerms }),
  setAnimationKey: (animationKey) => set({ animationKey }),
  incrementAnimationKey: () =>
    set((state) => ({ animationKey: state.animationKey + 1 })),
  incrementActiveFormIndex: () =>
    set((state) => ({ activeFormIndex: state.activeFormIndex + 1 })),
  decrementActiveFormIndex: () =>
    set((state) => ({ activeFormIndex: state.activeFormIndex - 1 })),
  resetForm: () =>
    set({
      formData: {
        fullName: "",
        phone: "",
        email: "",
        reason: "",
        onBehalf: "",
        helpText: "",
        interestedIn: "",
      },
      formErrors: {
        fullName: "",
        phone: "",
        email: "",
        reason: "",
        onBehalf: "",
        helpText: "",
        interestedIn: "",
      },
      activeFormIndex: 0,
      animationKey: 0,
    }),
}));

export default consultantStore;
export type { FormData };
