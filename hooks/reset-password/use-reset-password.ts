"use client";
import { useState, FormEvent, KeyboardEvent, ChangeEvent, use } from "react";
import { FormValidator } from "@/utils/validator";
import { NotifierModel } from "@/types/NotifierModel";
import { KEYS } from "@/constants/KeyConstants";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import useResetPasswordUIStore from "@/store/ui/reset-password-ui-store";
import useLoadingState from "@/store/loader/loding-state";
import { StatusMessages } from "@/constants/StatusMessages";
import { Services } from "@/services/service";

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password: string;
  confirmPassword: string;
}

const useResetPassword = () => {
  //store
  const { setShowLogin } = useAuthUIStore();
  const { resetPasswordToken, setResetPasswordToken, setShowResetPassword } =
    useResetPasswordUIStore();
  const { loading, authLoader, setAuthLoader } = useLoadingState();

  //state
  const [notifierState, setNotifierState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const [NotifierDetails, setNotifierDetails] = useState<NotifierModel>({
    message: "",
    mode: "error",
  });

  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    password: "",
    confirmPassword: "",
  });

  //handlers
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    NotifierReset();
    setAuthLoader(true);
    try {
      const { password } = formData;
      const token = resetPasswordToken || "";
      if (token && token !== "") {
        let result = await Services.ResetPassword(password, token);
        if (!result || result.status !== "success") {
          setNotifierState(true);
          setNotifierDetails({
            message:
              result?.message || StatusMessages.ErrorMessage.PasswordReset,
            mode: "error",
          });
          return;
        }
        setIsPasswordReset(true);
      }
    } catch (err) {
      setNotifierState(true);
      setNotifierDetails({
        message: StatusMessages.ErrorMessage.PasswordReset,
        mode: "error",
      });
      console.error("Reset Password Error:", err);
    } finally {
      setAuthLoader(false);
    }
  };

  const handler = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault();
      onSubmit(e as FormEvent<HTMLFormElement>);
    }
  };

  const handleNotifierClose = () => {
    setNotifierState(false);
    setNotifierDetails({
      message: "",
      mode: "error",
    });
  };

  const handleInputChange =
    (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (formErrors[field]) {
        setFormErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }

      // Also clear confirm password error if password field changes
      if (field === "password" && formErrors.confirmPassword) {
        setFormErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }
    };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleLogin = () => {
    setShowLogin(true);
    setShowResetPassword(false);
  };

  //validators
  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ): string => {
    if (!confirmPassword)
      return StatusMessages.SchemaMessage.ConfirmPasswordRequired;
    if (confirmPassword !== password)
      return StatusMessages.SchemaMessage.PasswordsDoNotMatch;
    return "";
  };

  const validateField = (field: keyof FormData, value: string) => {
    let error = FormValidator(field, value);

    if (field === "confirmPassword") {
      error = validateConfirmPassword(value, formData.password);
    }

    setFormErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    return error === "";
  };

  const validateForm = (): boolean => {
    const passwordError = FormValidator("password", formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );

    setFormErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // Check if any errors exist
    return passwordError === "" && confirmPasswordError === "";
  };

  //reseter
  const resetForm = () => {
    setFormData({
      password: "",
      confirmPassword: "",
    });
    setFormErrors({
      password: "",
      confirmPassword: "",
    });
  };

  const clearErrors = () => {
    setFormErrors({
      password: "",
      confirmPassword: "",
    });
  };

  const NotifierReset = () => {
    setNotifierState(false);
    setNotifierDetails({
      message: "",
      mode: "error",
    });
  };

  return {
    formData,
    formErrors,
    notifierState,
    showPassword,
    showConfirmPassword,
    NotifierDetails,
    isPasswordReset,
    authLoader,
    loading,
    resetForm,
    clearErrors,
    validateField,
    validateForm,
    onSubmit,
    handler,
    handleInputChange,
    handleNotifierClose,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    setNotifierDetails,
    setNotifierState,
    handleLogin,
  };
};

export default useResetPassword;
