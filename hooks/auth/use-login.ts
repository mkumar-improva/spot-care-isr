"use client";
import { useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { NotifierModel } from "@/types/NotifierModel";
import { FormValidator } from "@/utils/validator";
import { KEYS, AUTH_KEYS } from "@/constants/KeyConstants";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import useLoadingState from "@/store/loader/loding-state";
import { Services } from "@/services/service";
import { StatusMessages } from "@/constants/StatusMessages";
import { AuthHelper } from "@/utils/auth-helper";
import useAuthDataStore from "@/store/data/use-auth-data-store";

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
  const {
    setShowSignup,
    setShowLogin,
    setShowForgotPassword,
    setIsLoggedIn,
    setProfileImage,
  } = useAuthUIStore();
  const { loading, authLoader, setAuthLoader } = useLoadingState();
  const { setUserDetail } = useAuthDataStore();

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
  const [otpNotifierDetails, setOtpNotifierDetails] = useState<NotifierModel>({
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

  const handleOtpNotifierClose = () => {
    setOtpNotifierDetails({
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
    if (authLoader || loading) return;
    if (!validateForm()) {
      return;
    }
    setAuthLoader(true);
    NotifierReset();
    const { email, password } = formData;
    try {
      let result = await Services.Login(email, password);
      if (!result || result.status !== "success") {
        console.error("Login failed:", result?.message);
        if (result?.message.includes("402")) {
          throw new Error(result.message);
        } else {
          triggerNotifier(
            result?.message || StatusMessages.ErrorMessage.LoginError,
            "error"
          );
        }
        return;
      }
      // Successful login
      AuthHelper.saveSession(result.data);
      setProfileImage(result.data.profilePicture || "");
      setUserDetail(result.data);
      setShowLogin(false);
      setIsLoggedIn(true);
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.message.includes("402")) {
        const msg = err?.message || "Unexpected error occurred";
        const isUnverified = msg.includes("402");
        if (isUnverified) {
          localStorage.setItem(AUTH_KEYS.UNVERIFIED_EMAIL, email);
          triggerNotifier(
            msg.split("-")[0],
            "error",
            "Verify now",
            verifyNowClicked
          );
        } else {
          triggerNotifier(StatusMessages.ErrorMessage.LoginError, "error");
        }
      }
    } finally {
      setEmail(email);
      setAuthLoader(false);
    }
  };

  const onSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const openForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const verifyNowClicked = async () => {
    await onResendClick();
    setIsVerificationPending(true);
  };

  const triggerNotifier = (
    message: string,
    mode: "error" | "success",
    link?: string,
    onClick?: () => void
  ) => {
    setNotifierState(true);
    setNotifierDetails({
      message,
      mode,
      ...(link && onClick ? { link, onClick } : {}),
    });
  };

  const handleOtpsubmit = async (otp: string) => {
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
      setIsVerificationPending(false);
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
    NotifierReset();
    OtpNotifierReset();
    try {
      let email = localStorage.getItem(AUTH_KEYS.UNVERIFIED_EMAIL) || "";
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
      if (!isVerificationPending) {
        triggerNotifier(StatusMessages.ErrorMessage.OTPError, "error");
      } else {
        setOtpNotifierDetails({
          message: StatusMessages.ErrorMessage.OTPError,
          mode: "error",
        });
      }
    } finally {
      setAuthLoader(false);
    }
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

  const NotifierReset = () => {
    setNotifierState(false);
    setNotifierDetails({
      message: "",
      mode: "error",
    });
  };

  const OtpNotifierReset = () => {
    setOtpNotifierDetails({
      message: "",
      mode: "error",
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
    authLoader,
    loading,
    otpNotifierDetails,
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
    handleOtpsubmit,
    onResendClick,
    handleOtpNotifierClose,
  };
};

export default useLogin;
