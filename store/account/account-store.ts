import { create } from "zustand";
import { UserData } from "@/types/user-data";
import { NotifierModel } from "@/types/notifier-model";

interface ProfileFormData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture: string;
}

interface ProfileErrors {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordErrors {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AccountState {
  // User data
  userDetail: UserData | null;
  
  // Profile form state
  formData: ProfileFormData;
  formErrors: ProfileErrors;
  profilePictureBlob: Blob | null;
  
  // Password form state
  passwordData: PasswordData;
  passwordErrors: PasswordErrors;
  
  // UI state
  profileLoader: boolean;
  imgLoader: boolean;
  loadProfile: boolean;
  selectedTab: number;
  
  // Notifier state
  notifierState: boolean;
  notifierDetails: NotifierModel;
}

interface AccountActions {
  // User data actions
  setUserDetail: (user: UserData | null) => void;
  
  // Profile form actions
  setFormData: (data: ProfileFormData) => void;
  setFormErrors: (errors: ProfileErrors) => void;
  setProfilePictureBlob: (blob: Blob | null) => void;
  updateFormField: (field: keyof ProfileFormData, value: any) => void;
  updateFormError: (field: keyof ProfileErrors, error: string) => void;
  
  // Password form actions
  setPasswordData: (data: PasswordData) => void;
  setPasswordErrors: (errors: PasswordErrors) => void;
  updatePasswordField: (field: keyof PasswordData, value: string) => void;
  updatePasswordError: (field: keyof PasswordErrors, error: string) => void;
  resetPasswordForm: () => void;
  
  // UI actions
  setProfileLoader: (loading: boolean) => void;
  setImgLoader: (loading: boolean) => void;
  setLoadProfile: (loading: boolean) => void;
  setSelectedTab: (tab: number) => void;
  
  // Notifier actions
  setNotifierState: (state: boolean) => void;
  setNotifierDetails: (details: NotifierModel) => void;
  showNotifier: (message: string, mode: "success" | "error") => void;
  hideNotifier: () => void;
  
  // Combined actions
  initializeUserData: (user: UserData) => void;
  resetAllForms: () => void;
}

const initialFormData: ProfileFormData = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  profilePicture: "",
};

const initialFormErrors: ProfileErrors = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const initialPasswordData: PasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const initialPasswordErrors: PasswordErrors = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const initialNotifierDetails: NotifierModel = {
  message: "",
  mode: "error",
};

const useAccountStore = create<AccountState & AccountActions>((set, get) => ({
  // Initial state
  userDetail: null,
  formData: initialFormData,
  formErrors: initialFormErrors,
  profilePictureBlob: null,
  passwordData: initialPasswordData,
  passwordErrors: initialPasswordErrors,
  profileLoader: false,
  imgLoader: false,
  loadProfile: true,
  selectedTab: 0,
  notifierState: false,
  notifierDetails: initialNotifierDetails,

  // User data actions
  setUserDetail: (user) => set({ userDetail: user }),

  // Profile form actions
  setFormData: (data) => set({ formData: data }),
  setFormErrors: (errors) => set({ formErrors: errors }),
  setProfilePictureBlob: (blob) => set({ profilePictureBlob: blob }),
  updateFormField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  updateFormError: (field, error) =>
    set((state) => ({
      formErrors: { ...state.formErrors, [field]: error },
    })),

  // Password form actions
  setPasswordData: (data) => set({ passwordData: data }),
  setPasswordErrors: (errors) => set({ passwordErrors: errors }),
  updatePasswordField: (field, value) =>
    set((state) => ({
      passwordData: { ...state.passwordData, [field]: value },
    })),
  updatePasswordError: (field, error) =>
    set((state) => ({
      passwordErrors: { ...state.passwordErrors, [field]: error },
    })),
  resetPasswordForm: () =>
    set({
      passwordData: initialPasswordData,
      passwordErrors: initialPasswordErrors,
    }),

  // UI actions
  setProfileLoader: (loading) => set({ profileLoader: loading }),
  setImgLoader: (loading) => set({ imgLoader: loading }),
  setLoadProfile: (loading) => set({ loadProfile: loading }),
  setSelectedTab: (tab) => set({ selectedTab: tab }),

  // Notifier actions
  setNotifierState: (state) => set({ notifierState: state }),
  setNotifierDetails: (details) => set({ notifierDetails: details }),
  showNotifier: (message, mode) =>
    set({
      notifierState: true,
      notifierDetails: { message, mode },
    }),
  hideNotifier: () =>
    set({
      notifierState: false,
      notifierDetails: initialNotifierDetails,
    }),

  // Combined actions
  initializeUserData: (user) =>
    set({
      userDetail: user,
      formData: {
        id: user.id || 0,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        profilePicture: user.profilePicture || "",
      },
      loadProfile: false,
      profileLoader: false,
    }),

  resetAllForms: () =>
    set({
      formData: initialFormData,
      formErrors: initialFormErrors,
      passwordData: initialPasswordData,
      passwordErrors: initialPasswordErrors,
      profilePictureBlob: null,
      notifierState: false,
      notifierDetails: initialNotifierDetails,
    }),
}));

export default useAccountStore;