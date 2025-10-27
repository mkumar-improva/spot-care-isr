"use client";
import { useState, FormEvent, KeyboardEvent } from "react";
import { formatPhoneNumber } from "@/utils/converter";
import { FormValidator } from "@/utils/validator";
import { NotifierModel } from "@/types/NotifierModel";
import { KEYS } from "@/constants/KeyConstants";
import useAuthUIStore from "@/store/ui/auth-ui-store";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const useSignUp = () => {
  //store
  const { setShowLogin, setShowSignup } = useAuthUIStore();

  //state
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isVerificationStarted, setisVerificationStarted] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [NotifierState, setNotifierState] = useState(false);
  const [NotifierDetails, setNotifierDetails] = useState<NotifierModel>({
    message: "",
    mode: "error",
  });

  const [otpNotifierDetails, setOtpNotifierDetails] = useState<NotifierModel>({
    message: "",
    mode: "error",
  });

  //handler

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // Special handling for phone formatting
      if (field === "phone") {
        value = formatPhoneNumber(value);
      }

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

  const handler = (e: KeyboardEvent) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const onLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleNotifierClose = () => {
    setNotifierState(false);
    setNotifierDetails({
      message: "",
      mode: "error",
    });
  };

  //validations and others can be added here
  const validateField = (field: keyof FormData, value: string) => {
    let error = FormValidator(field, value);
    setFormErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
    return error === "";
  };

  const validateForm = () => {
    const firstNameValid = validateField("firstName", formData.firstName);
    const lastNameValid = validateField("lastName", formData.lastName);
    const emailValid = validateField("email", formData.email);
    const passwordValid = validateField("password", formData.password);
    const phoneValid = validateField("phone", formData.phone);
    return (
      firstNameValid &&
      lastNameValid &&
      emailValid &&
      passwordValid &&
      phoneValid
    );
  };

  //reseter
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
    setFormErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  const clearErrors = () => {
    setFormErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  return {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    isVerificationStarted,
    setisVerificationStarted,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    NotifierState,
    setNotifierState,
    NotifierDetails,
    setNotifierDetails,
    otpNotifierDetails,
    setOtpNotifierDetails,
    handler,
    onSubmit,
    onLoginClick,
    handleNotifierClose,
    handleInputChange,
    validateField,
    validateForm,
    resetForm,
    clearErrors,
    togglePasswordVisibility,
  };
};

export default useSignUp;
