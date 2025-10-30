import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Services } from "@/services/service";
import { StatusMessages } from "@/constants/StatusMessages";
import { isValidToken } from "@/utils/token-validators";
import { formatPhoneNumber } from "@/utils/converter";
import useAccountStore from "@/store/account/account-store";
import { AUTH_KEYS } from "@/constants/KeyConstants";
import { AuthHelper } from "@/utils/auth-helper";
import { UserData } from "@/types/user-data";
export const useAccount = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const {
    userDetail,
    formData,
    loadProfile,
    profileLoader,
    imgLoader,
    selectedTab,
    notifierState,
    notifierDetails,
    profilePictureBlob,
    setSelectedTab,
    setLoadProfile,
    setProfileLoader,
    setImgLoader,
    setProfilePictureBlob,
    updateFormField,
    showNotifier,
    hideNotifier,
    initializeUserData,
  } = useAccountStore();

  // Initialize user data from local storage by email
// Immediately hydrate from localStorage if data exists (SPA navigation, no loader/API)
useEffect(() => {
  if (userDetail) return; // already hydrated
  if (typeof window === "undefined") return; // SSR safeguard
  const hydrated = getUserDataFromLocalStorage();
  if (hydrated) {
    initializeUserData(hydrated);
    setLoadProfile(false);
  }
}, []);

// Only call the API if loadProfile is still true
useEffect(() => {
  if (!loadProfile) return;

  const init = async () => {
    try {
      const email = localStorage.getItem(AUTH_KEYS.EMAIL) || "";
      if (!email) {
        setLoadProfile(false);
        return;
      }
      const resp = await Services.GetUserByEmail(email);
      if (resp && resp.status === "success" && resp.data) {
        const user = resp.data;
        initializeUserData(user);
        localStorage.setItem("userDetail", JSON.stringify(user)); // Update fast-hydrate JSON cache
        // update other localStorage fields as needed...
        const session = AuthHelper.getSession();
        localStorage.setItem(AUTH_KEYS.EMAIL, user.email ?? "");
        localStorage.setItem(AUTH_KEYS.USERNAME, user.firstName ?? "");
        localStorage.setItem(AUTH_KEYS.USERID, user.id?.toString() ?? "");
        localStorage.setItem(AUTH_KEYS.PROFILEIMAGE, user.profilePicture ?? "");
        if (session.token) {
          localStorage.setItem(AUTH_KEYS.TOKEN, session.token);
        }
        localStorage.setItem(AUTH_KEYS.ISLOGGEDIN, "true");
      }
    } finally {
      setLoadProfile(false);
    }
  };

  init();
}, [loadProfile, initializeUserData, setLoadProfile]);

  // Handle logout
  const logout = useCallback(() => {
    // Clear auth session keys
    Object.values(AUTH_KEYS).forEach((key) => localStorage.removeItem(key));
    router.push("/");
  }, [router]);

  // Handle profile picture click
  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  function getUserDataFromLocalStorage(): UserData | null {
    try {
      // Try reading from a JSON string if possible
      const userDetailRaw = localStorage.getItem("userDetail");
      if (userDetailRaw) {
        const parsed = JSON.parse(userDetailRaw);
        if (parsed && typeof parsed === "object" && parsed.email) {
          return parsed as UserData;
        }
      }
      // Legacy: reconstruct from AUTH_KEYS
      const email = localStorage.getItem(AUTH_KEYS.EMAIL);
      if (email) {
        return {
          id: +(localStorage.getItem(AUTH_KEYS.USERID) || 0),
          email,
          plan: null,
          firstName: localStorage.getItem(AUTH_KEYS.USERNAME) || "",
          lastName: "",
          phone: "",
          profilePicture: localStorage.getItem(AUTH_KEYS.PROFILEIMAGE) || "",
          resetToken: null,
          resetTokenExpiry: null,
          role: "",
          subscriptionEndDate: null,
          subscriptionStatus: null,
          token: localStorage.getItem(AUTH_KEYS.TOKEN) || "",
        };
      }
      return null;
    } catch {
      return null;
    }
  }
  // Handle profile picture change
  const handleProfilePictureChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        e.target.value = "";
        return;
      }

      // Validate file type
      const fileExtension = file.name.split(".").at(-1)?.toUpperCase();
      const acceptedExtensions = ["JPEG", "PNG", "JPG"];
      if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
        showNotifier(StatusMessages.ErrorMessage.InvalidImageType, "error");
        e.target.value = "";
        return;
      }

      // Validate file size (2MB limit)
      if (file.size > 2097152) {
        showNotifier(StatusMessages.ErrorMessage.ImageSize, "error");
        e.target.value = "";
        return;
      }

      // Create blob and read file
      const blob = new Blob([file], { type: file.type });
      setProfilePictureBlob(blob);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          updateFormField("profilePicture", reader.result as string);
        }
      };
      reader.onerror = () => {
        showNotifier("Error reading file", "error");
      };
      reader.readAsDataURL(file);

      e.target.value = "";
    },
    [setProfilePictureBlob, updateFormField, showNotifier]
  );

  // Save profile picture
  const saveProfilePicture = useCallback(async () => {
    if (!formData.profilePicture || !profilePictureBlob || !userDetail) return;

    setImgLoader(true);
    setProfileLoader(true);
    
    try {
      if (!isValidToken()) {
        logout();
        return;
      }

      const result = await Services.updateProfile(
        profilePictureBlob,
        userDetail.firstName,
        userDetail.lastName,
        userDetail.phone,
        userDetail.email
      );

      if (result?.status === "success") {
        const newProfilePicture = result.data?.profilePicture ?? "";
        
        // Update local auth cache and in-store user
        localStorage.setItem(AUTH_KEYS.PROFILEIMAGE, newProfilePicture);
        const updatedUser = { ...userDetail, profilePicture: newProfilePicture };
        initializeUserData(updatedUser);
        // Update form and clear blob to stop effect loop
        updateFormField("profilePicture", newProfilePicture);
        setProfilePictureBlob(null);
        
        showNotifier(
          StatusMessages.SuccessMessages.ProfileImageUpdate,
          "success"
        );
      } else {
        showNotifier(
          StatusMessages.ErrorMessage.ProfileImageUpdate,
          "error"
        );
      }
    } catch (error) {
      showNotifier(StatusMessages.ErrorMessage.ProfileImageUpdate, "error");
    } finally {
      setImgLoader(false);
      setProfileLoader(false);
    }
  }, [
    formData.profilePicture,
    profilePictureBlob,
    userDetail,
    setImgLoader,
    setProfileLoader,
    logout,
    showNotifier,
    initializeUserData,
    updateFormField,
    setProfilePictureBlob,
  ]);

  // Remove profile picture
  const removeProfilePicture = useCallback(async () => {
    if (!formData.email) return;

    setProfileLoader(true);
    try {
      setProfilePictureBlob(null);
      await Services.RemoveProfilePicture(formData.email);
      localStorage.setItem(AUTH_KEYS.PROFILEIMAGE, "");
      updateFormField("profilePicture", "");
      if (userDetail) {
        const updatedUser = { ...userDetail, profilePicture: "" };
        initializeUserData(updatedUser);
      }
    } catch (error) {
      console.error("Error removing profile picture:", error);
    } finally {
      setProfileLoader(false);
    }
  }, [
    formData.email,
    setProfileLoader,
    setProfilePictureBlob,
    updateFormField,
    userDetail,
    initializeUserData,
  ]);

  // Effect to save profile picture when it changes
  useEffect(() => {
    if (
      profilePictureBlob &&
      formData.profilePicture &&
      formData.profilePicture !== (userDetail?.profilePicture || "")
    ) {
      saveProfilePicture();
    }
  }, [profilePictureBlob, formData.profilePicture, userDetail?.profilePicture, saveProfilePicture]);

  // Check if user data is loaded
  const hasUserData = userDetail && userDetail.id > 0;

  return {
    // Refs
    fileInputRef,
    
    // State
    userDetail,
    formData,
    loadProfile,
    profileLoader,
    imgLoader,
    selectedTab,
    notifierState,
    notifierDetails,
    hasUserData,
    // derive subscription-like details if needed in UI (not currently used)
    subscriptionDetails: userDetail
      ? {
          plan: userDetail.plan ?? null,
          subscriptionEndDate: userDetail.subscriptionEndDate ?? null,
          subscriptionStatus: userDetail.subscriptionStatus ?? null,
        }
      : null,

    // Actions
    setSelectedTab,
    logout,
    handleAvatarClick,
    handleProfilePictureChange,
    removeProfilePicture,
    hideNotifier,

    // Computed values
    displayName: `${formData.firstName || userDetail?.firstName || ""} ${formData.lastName || userDetail?.lastName || ""}`.trim(),
    displayPhone: formatPhoneNumber(formData.phone || userDetail?.phone || ""),
    displayEmail: formData.email || userDetail?.email || "",
  };
};