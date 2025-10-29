import { useEffect, useCallback } from "react";
import { Services } from "@/services/service";
import { StatusMessages } from "@/constants/StatusMessages";
import { isValidToken } from "@/utils/token-validators";
import { formatPhoneNumber } from "@/utils/converter";
import useAccountStore from "@/store/account/account-store";
import { UserData } from "@/types/user-data";
import { AUTH_KEYS } from "@/constants/KeyConstants";

interface UseProfileTabProps {
  onLogout: () => void;
}

export const useProfileTab = ({ onLogout }: UseProfileTabProps) => {
  const {
    formData,
    formErrors,
    profilePictureBlob,
    profileLoader,
    userDetail,
    setFormData,
    setFormErrors,
    setProfilePictureBlob,
    setProfileLoader,
    updateFormField,
    updateFormError,
    showNotifier,
    setUserDetail,
    initializeUserData,
  } = useAccountStore();

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "phone") {
        updateFormField(name as keyof typeof formData, formatPhoneNumber(value));
      } else {
        updateFormField(name as keyof typeof formData, value);
      }
      updateFormError(name as keyof typeof formErrors, "");
    },
    [updateFormField, updateFormError]
  );

  // Handle blur event for validation
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      let errorMessage = "";

      if (!value.trim()) {
        switch (name) {
          case "firstName":
            errorMessage = "First name is required";
            break;
          case "lastName":
            errorMessage = "Last name is required";
            break;
          case "phone":
            errorMessage = "Phone is required";
            break;
        }
      } else if (name === "phone" && !/^\d{3}-?\d{3}-?\d{4}$/.test(value)) {
        errorMessage = "Invalid phone number";
      }

      updateFormError(name as keyof typeof formErrors, errorMessage);
    },
    [updateFormError]
  );

  // Validate entire form
  const validateForm = useCallback(() => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (!/^\d{3}-?\d{3}-?\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number.";
    }

    setFormErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  }, [formData, setFormErrors]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = validateForm();

      if (!isValid) return;

      setProfileLoader(true);
      try {
        if (!isValidToken()) {
          onLogout();
          return;
        }

        const result = await Services.updateProfile(
          profilePictureBlob,
          formData.firstName,
          formData.lastName,
          formData.phone,
          formData.email
        );

        if (result?.status === "success") {
          showNotifier(
            StatusMessages.SuccessMessages.ProfileUpdate,
            "success"
          );
          
          // Update user detail in store and localStorage
          const updatedUser: UserData = {
            ...userDetail!,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            profilePicture: result.data?.profilePicture || formData.profilePicture,
          };
          initializeUserData(updatedUser);
        } else {
          showNotifier(StatusMessages.ErrorMessage.ProfileUpdate, "error");
        }
      } catch (error: any) {
        if (!isValidToken()) {
          onLogout();
          return;
        }
        showNotifier(StatusMessages.ErrorMessage.ProfileUpdate, "error");
      } finally {
        setProfileLoader(false);
      }
    },
    [
      validateForm,
      setProfileLoader,
      onLogout,
      profilePictureBlob,
      formData,
      showNotifier,
      userDetail,
      initializeUserData,
    ]
  );

  // Handle profile picture change
  const handleProfilePictureChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file
      const fileExtension = file.name.split(".").at(-1)?.toUpperCase();
      const acceptedExtension = ["JPEG", "PNG", "JPG"];
      if (!fileExtension || !acceptedExtension.includes(fileExtension)) {
        showNotifier(StatusMessages.ErrorMessage.InvalidImageType, "error");
        e.target.value = "";
        return;
      }

      if (file.size > 2097152) {
        // 2MB limit
        showNotifier(StatusMessages.ErrorMessage.ImageSize, "error");
        e.target.value = "";
        return;
      }

      // Create blob and update form data
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

    setProfileLoader(true);
    try {
      if (!isValidToken()) {
        onLogout();
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
        const newProfileUrl = result.data?.profilePicture || "";
        const updatedUser = {
          ...userDetail,
          profilePicture: newProfileUrl,
        };
        initializeUserData(updatedUser);
        updateFormField("profilePicture", newProfileUrl);
        setProfilePictureBlob(null);
        localStorage.setItem(
          AUTH_KEYS.PROFILEIMAGE,
          newProfileUrl
        );
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
      setProfileLoader(false);
    }
  }, [
    formData.profilePicture,
    profilePictureBlob,
    userDetail,
    setProfileLoader,
    onLogout,
    initializeUserData,
    showNotifier,
    updateFormField,
    setProfilePictureBlob,
  ]);

  // Remove profile picture
  const removeProfilePicture = useCallback(async () => {
    if (!formData.email) return;

    setProfileLoader(true);
    try {
      await Services.RemoveProfilePicture(formData.email);
      
      setProfilePictureBlob(null);
      updateFormField("profilePicture", "");
      
      if (userDetail) {
        const updatedUser = { ...userDetail, profilePicture: "" };
        initializeUserData(updatedUser);
        localStorage.setItem(AUTH_KEYS.PROFILEIMAGE, "");
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

  return {
    // State
    formData,
    formErrors,
    profileLoader,
    
    // Handlers
    handleInputChange,
    handleBlur,
    handleSubmit,
    handleProfilePictureChange,
    removeProfilePicture,
    
    // Utilities
    validateForm,
  };
};