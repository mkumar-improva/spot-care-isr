"use client";
import Notifier from "@/components/ui/Notifier/Notifier";
import { NotifierModel } from "@/types/NotifierModel";
import { KEYS } from "@/constants/KeyConstants";
import { FC, useEffect, useState, KeyboardEvent, FormEvent, use } from "react";
import { FormValidator } from "@/utils/validator";

interface FormData {
  email: string;
}

interface FormErrors {
  email: string;
}

const useForgotPassword = () => {
  //state
  const [NotifierState, setNotifierState] = useState(false);
  const [NotifierDetails, setNotifierDetails] = useState<NotifierModel>({
    message: "",
    mode: "error",
  });
  const [showConfirmationPopup, setShowConfirmationPopup] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: "",
  });

  //useffects
  useEffect(() => {
    const handlerEffect = (e: WindowEventMap["keydown"]) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSubmit(e as any);
      }
    };
    window.addEventListener("keydown", handlerEffect);
    return () => window.removeEventListener("keydown", handlerEffect);
  }, []);

  //handlers
  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handler = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault();
      onSubmit(e as any);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setNotifierState(false);
    setShowConfirmationPopup(true);
  };

  const handleNotifierClose = () => {
    setNotifierState(false);
    setNotifierDetails({
      message: "",
      mode: "error",
    });
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
    return emailValid;
  };

  //reseter
  const resetForm = () => {
    setFormData({
      email: "",
    });
    setFormErrors({
      email: "",
    });
  };

  const clearErrors = () => {
    setFormErrors({
      email: "",
    });
  };

  return {
    formData,
    formErrors,
    showConfirmationPopup,
    setShowConfirmationPopup,
    handleInputChange,
    handler,
    onSubmit,
    NotifierState,
    setNotifierState,
    NotifierDetails,
    setNotifierDetails,
    handleNotifierClose,
    validateField,
    validateForm,
    resetForm,
    clearErrors,
  };
};

export default useForgotPassword;
