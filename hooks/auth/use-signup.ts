"use client";
import { useState, FormEvent, KeyboardEvent } from "react";
import { formatPhoneNumber } from "@/utils/converter";
import { FormValidator } from "@/utils/validator";
import { NotifierModel } from "@/types/NotifierModel";
import { KEYS } from "@/constants/KeyConstants";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import useLoadingState from "@/store/loader/loding-state";
import { StatusMessages } from "@/constants/StatusMessages";
import { Services } from "@/services/service";

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
  const { authLoader, loading, setAuthLoader } = useLoadingState();

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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    NotifierReset();
    if (authLoader || loading) return; //prevent multiple submissions
    if (!validateForm()) {
      console.error("Form validation failed");
      return;
    }
    const { firstName, lastName, phone, email, password } = formData;
    const sanitizedPhone = phone.replace(/-/g, "");
    try {
      setAuthLoader(true);
      let result = await Services.Register(
        firstName,
        lastName,
        sanitizedPhone,
        email,
        password
      );
      if (!result || result.status !== "success") {
        notify(
          result?.message || StatusMessages.ErrorMessage.SignupError,
          "error"
        );
        console.error(result?.message || "Signup failed");
        return;
      }
      setEmail(email); // Set the email for OTP verification
      setisVerificationStarted(true);
    } catch (err) {
      notify(StatusMessages.ErrorMessage.SignupError, "error");
      console.error("Signup failed:", err);
    } finally {
      setAuthLoader(false);
    }
  };

  const notify = (message: string, mode: "success" | "error" | "warning") => {
    setNotifierState(true);
    setNotifierDetails({ message, mode });
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

  const onVerificationSubmit = async (otp: string) => {
    // Implement OTP verification logic here
    setAuthLoader(true);
    OtpNotifierReset();
    try {
      const trimmedOtp = otp.trim();
      if (trimmedOtp === "" || trimmedOtp.length < 4) {
        setOtpNotifierDetails({
          message: StatusMessages.SchemaMessage.otpField,
          mode: "error",
        });
        return;
      }

      // Check for invalid characters (spaces)
      if (/\s/.test(otp)) {
        setOtpNotifierDetails({
          message: StatusMessages.ErrorMessage.VerificationCodeMissing,
          mode: "error",
        });
        return;
      }

      let result = await Services.Verify(trimmedOtp, email);
      if (!result || result.status !== "success") {
        setOtpNotifierDetails({
          message:
            result?.message || StatusMessages.ErrorMessage.VerificationCode,
          mode: "error",
        });
        return;
      }
      setShowLogin(true);
      setShowSignup(false);
    } catch (err) {
      console.error("OTP verification failed:", err);
      setOtpNotifierDetails({
        message: StatusMessages.ErrorMessage.VerificationCode,
        mode: "error",
      });
    } finally {
      setAuthLoader(false);
    }
  };

  const onResendClick = async () => {
    setAuthLoader(true);
    OtpNotifierReset();
    try {
      let result = await Services.RetryVerification(email);
      if (!result || result.status !== "success") {
        setOtpNotifierDetails({
          message: result?.message || StatusMessages.ErrorMessage.OTPError,
          mode: "error",
        });
        return;
      }
      setOtpNotifierDetails({
        message: StatusMessages.SuccessMessages.OtpVerification,
        mode: "success",
      });
    } catch (err) {
      console.error("Resend OTP failed:", err);
      setOtpNotifierDetails({
        message: StatusMessages.ErrorMessage.OTPError,
        mode: "error",
      });
    } finally {
      setAuthLoader(false);
    }
  };

  //Handle Otp Notifier close
  const handleOtpNotifierClose = () => {
    setOtpNotifierDetails({ message: "", mode: "error" });
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

  const NotifierReset = () => {
    setNotifierState(false);
    setNotifierDetails({
      message: "",
      mode: "error",
    });
  };

  const OtpNotifierReset = () => {
    setOtpNotifierDetails({ message: "", mode: "error" });
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
    authLoader,
    loading,
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
    onVerificationSubmit,
    onResendClick,
    handleOtpNotifierClose,
  };
};

export default useSignUp;
