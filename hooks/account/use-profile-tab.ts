import { useCallback } from "react";
import { Services } from "@/services/service";
import { StatusMessages } from "@/constants/StatusMessages";
import { isValidToken } from "@/utils/token-validators";
import { formatPhoneNumber } from "@/utils/converter";
import useAccountStore from "@/store/account/account-store";
import { UserData } from "@/types/user-data";

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
    setFormErrors,
    setProfileLoader,
    updateFormField,
    updateFormError,
    showNotifier,
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

  return {
    formData,
    formErrors,
    profileLoader,
    handleInputChange,
    handleBlur,
    handleSubmit,
    validateForm,
  };
};