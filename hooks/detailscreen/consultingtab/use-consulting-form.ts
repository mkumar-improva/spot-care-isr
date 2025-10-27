"use client";

import { useCallback } from "react";
import { validateField } from "@/utils/validate-field";
import consultantStore, { type FormData } from "@/store/detailscreen/consultingtab/consultant-store";

interface StepFields {
  [key: number]: (keyof FormData)[];
}

const stepFields: StepFields = {
  0: ["reason", "onBehalf"],
  1: ["helpText", "interestedIn"],
  2: ["fullName", "phone", "email"],
};

export const useConsultingForm = () => {
  const { formData, formErrors, updateFormField, updateFormError, setFormErrors, acceptTerms } = consultantStore();

  const validateCurrentStep = useCallback(
    (stepIndex: number): boolean => {
      const fieldsToValidate = stepFields[stepIndex];
      if (!fieldsToValidate) return false;

      const newErrors: FormData = {
        fullName: "",
        phone: "",
        email: "",
        reason: "",
        onBehalf: "",
        helpText: "",
        interestedIn: "",
      };
      let isValid = true;

      fieldsToValidate.forEach((field) => {
        const error = !validateField(field, formData[field]);
        if (error) {
          isValid = false;
          const errorMessage = getValidationError(field, formData[field]);
          newErrors[field] = errorMessage;
        }
      });

      if (stepIndex === 2 && !acceptTerms) {
        isValid = false;
      }

      if (!isValid) {
        setFormErrors(newErrors);
      }

      return isValid;
    },
    [formData, acceptTerms, setFormErrors]
  );

  const getValidationError = (field: keyof FormData, value: string): string => {
    let error = "";
    validateField(field, value, (_, errorMsg) => {
      error = errorMsg;
    });
    return error;
  };

  const clearFormErrors = useCallback(() => {
    const emptyErrors: FormData = {
      fullName: "",
      phone: "",
      email: "",
      reason: "",
      onBehalf: "",
      helpText: "",
      interestedIn: "",
    };
    setFormErrors(emptyErrors);
  }, [setFormErrors]);

  const clearFieldError = useCallback(
    (field: keyof FormData) => {
      updateFormError(field, "");
    },
    [updateFormError]
  );

  return {
    formData,
    formErrors,
    acceptTerms,
    updateFormField,
    validateCurrentStep,
    clearFormErrors,
    clearFieldError,
    stepFields,
  };
};
