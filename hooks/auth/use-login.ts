"use client";
import React, {
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
} from "react";
import { NotifierModel } from "@/types/NotifierModel";
import { FormValidator } from "@/utils/validator";
import { KEYS } from "@/constants/KeyConstants";
import useAuthUIStore from "@/store/ui/auth-ui-store";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

const useLogin = () => {
  //store
  const { setShowSignup, setShowLogin, setShowForgotPassword } =
    useAuthUIStore();

  //state
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });
  const [notifierState, setNotifierState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVerificationPending, setIsVerificationPending] = useState(false);
  const [NotifierDetails, setNotifierDetails] = useState<NotifierModel>({
    message: "",
    mode: "error",
  });
  const [email, setEmail] = useState<string>("");

  //computed values
  const isFormValid =
    !formErrors.email &&
    !formErrors.password &&
    formData.email &&
    formData.password;

  const hasErrors = !!(formErrors.email || formErrors.password);

  //handlers
  const setFieldError = (field: keyof FormErrors, error: string) => {
    setFormErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
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
    };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleNotifierClose = () => {
    setNotifierState(false);
    setNotifierDetails({
      message: "",
      mode: "error",
    });
  };

  const handler = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault();
      onSubmit(e as FormEvent<HTMLFormElement>);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    return;
  };

  const onSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const openForgotPassword = () => {
    setShowForgotPassword(true);
  };

  //validation
  const validateField = (field: keyof FormData, value: string) => {
    let error = FormValidator(field, value);

    setFormErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    return error === "";
  };

  const validateForm = () => {
    const emailValid = validateField("email", formData.email);
    const passwordValid = validateField("password", formData.password);
    return emailValid && passwordValid;
  };

  //reseter
  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    setFormErrors({
      email: "",
      password: "",
    });
  };

  const clearErrors = () => {
    setFormErrors({
      email: "",
      password: "",
    });
  };

  return {
    formData,
    formErrors,
    notifierState,
    showPassword,
    isVerificationPending,
    NotifierDetails,
    email,
    isFormValid,
    hasErrors,
    openForgotPassword,
    onSignupClick,
    handleInputChange,
    handleNotifierClose,
    handler,
    onSubmit,
    validateField,
    validateForm,
    setFieldError,
    resetForm,
    clearErrors,
    togglePasswordVisibility,
  };
};

export default useLogin;
