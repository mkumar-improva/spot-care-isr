import { useCallback } from "react";
import { Services } from "@/services/service";
import { StatusMessages } from "@/constants/StatusMessages";
import { isValidToken } from "@/utils/token-validators";
import { AUTH_KEYS } from "@/constants/KeyConstants";
import useAccountStore from "@/store/account/account-store";

interface UseChangePasswordTabProps {
  onLogout: () => void;
}

export const useChangePasswordTab = ({ onLogout }: UseChangePasswordTabProps) => {
  const {
    passwordData,
    passwordErrors,
    profileLoader,
    setPasswordData,
    setPasswordErrors,
    setProfileLoader,
    updatePasswordField,
    updatePasswordError,
    showNotifier,
    resetPasswordForm,
  } = useAccountStore();

  // Handle password input change
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      updatePasswordField(name as keyof typeof passwordData, value);
      updatePasswordError(name as keyof typeof passwordErrors, "");
    },
    [updatePasswordField, updatePasswordError]
  );

  // Handle blur event for validation
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      let errorMessage = "";

      // Check if field is empty
      if (!value.trim()) {
        switch (name) {
          case "currentPassword":
            errorMessage = StatusMessages.SchemaMessage.CurrentPasswordRequired;
            break;
          case "newPassword":
            errorMessage = StatusMessages.SchemaMessage.NewPasswordRequired;
            break;
          case "confirmPassword":
            errorMessage = StatusMessages.SchemaMessage.ConfirmPasswordRequired;
            break;
        }
      } else {
        // Additional validations for new and confirm passwords
        if ((name === "newPassword" || name === "confirmPassword") && value.length < 8) {
          errorMessage = "Password must be at least 8 characters";
        } else if (name === "confirmPassword" && passwordData.newPassword !== value) {
          errorMessage = "Passwords do not match";
        }
      }

      updatePasswordError(name as keyof typeof passwordErrors, errorMessage);
    },
    [passwordData.newPassword, updatePasswordError]
  );

  // Validate password form
  const validatePasswordForm = useCallback(() => {
    const errors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!passwordData.currentPassword.trim()) {
      errors.currentPassword = StatusMessages.SchemaMessage.CurrentPasswordRequired;
    }

    if (!passwordData.newPassword.trim()) {
      errors.newPassword = StatusMessages.SchemaMessage.NewPasswordRequired;
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    if (!passwordData.confirmPassword.trim()) {
      errors.confirmPassword = StatusMessages.SchemaMessage.ConfirmPasswordRequired;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);
    return Object.values(errors).every((error) => error === "");
  }, [passwordData, setPasswordErrors]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = validatePasswordForm();
      if (!isValid) return;

      setProfileLoader(true);
      try {
        if (!isValidToken()) {
          onLogout();
          return;
        }

        const token = localStorage.getItem(AUTH_KEYS.TOKEN) ?? "";
        const result = await Services.ChangePassword(
          token,
          passwordData.currentPassword,
          passwordData.newPassword
        );

        if (result?.status === "success") {
          showNotifier(
            StatusMessages.SuccessMessages.PasswordReset,
            "success"
          );
          resetPasswordForm();
        } else {
          showNotifier(
            result?.message || StatusMessages.ErrorMessage.ChangePassword,
            "error"
          );
        }
      } catch (error: any) {
        if (!isValidToken()) {
          onLogout();
          return;
        }
        showNotifier(
          error.message || StatusMessages.ErrorMessage.ChangePassword,
          "error"
        );
      } finally {
        setProfileLoader(false);
      }
    },
    [
      validatePasswordForm,
      setProfileLoader,
      onLogout,
      passwordData,
      showNotifier,
      resetPasswordForm,
    ]
  );

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit(e as any);
      }
    },
    [handleSubmit]
  );

  return {
    // State
    passwordData,
    passwordErrors,
    profileLoader,

    // Handlers
    handlePasswordChange,
    handleBlur,
    handleSubmit,
    handleKeyDown,

    // Utilities
    validatePasswordForm,
  };
};