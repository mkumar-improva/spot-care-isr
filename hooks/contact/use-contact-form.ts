"use client";
import { useState } from "react";
import { FormValidator } from "utils/validator";

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  message: string;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
    message: "",
  });

  const handleInputChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (formErrors[field]) {
        setFormErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    };

  const handleInputBlur =
    (field: keyof FormData) =>
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      validateField(field, value);
    };

  const validateField = (field: keyof FormData, value: string): boolean => {
    const error = FormValidator(field, value);
    setFormErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    return error === "";
  };

  const validateForm = (): boolean => {
    const isFullNameValid = validateField("fullName", formData.fullName);
    const isEmailValid = validateField("email", formData.email);
    const isMessageValid = validateField("message", formData.message);

    return isFullNameValid && isEmailValid && isMessageValid;
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      message: "",
    });
    setFormErrors({
      fullName: "",
      email: "",
      message: "",
    });
  };


  const clearErrors = () => {
    setFormErrors({
      fullName: "",
      email: "",
      message: "",
    });
  };

  return {
    formData,
    formErrors,
    handleInputChange,
    handleInputBlur,
    validateForm,
    validateField,
    resetForm,
    clearErrors,
  };
};
