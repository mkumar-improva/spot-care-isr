"use client";
import React, { use, useEffect, useRef, useState, FormEvent } from "react";
import { FormValidator } from "@/utils/validator";
import useProviderListDataStore from "@/store/data/use-provider-list-data-store";
import { currentDateTimeVal } from "@/utils/date-time";
import useSearchUiStore from "@/store/ui/search-ui-store";
import { Services } from "@/services/service";
import { NotifierModel } from "@/types/notifier-model";
import { StatusMessages } from "@/constants/StatusMessages";

interface EmailFormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface EmailFormErrors {
  firstName: string;
  lastName: string;
  email: string;
}

interface useEmailFormProps {
  emailDialogOpen: boolean;
  setEmailDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailNotifierState: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailNotifierDetails: React.Dispatch<React.SetStateAction<NotifierModel>>;
}

const useEmailForm = ({
  emailDialogOpen,
  setEmailDialogOpen,
  setEmailNotifierState,
  setEmailNotifierDetails,
}: useEmailFormProps) => {
  //store
  const { savedProviderList } = useProviderListDataStore();
  const { servicesTag } = useSearchUiStore();

  //state
  const [formData, setFormData] = useState<EmailFormData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState<EmailFormErrors>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isEmailSent, setEmailSent] = useState<boolean>(false);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  // Field validation
  const validateField = (field: keyof EmailFormData, value: string) => {
    // Make lastName optional - only validate if not empty
    if (field === "lastName" && value.trim() === "") {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
      return true;
    }

    let error = FormValidator(field, value);
    setFormErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
    return error === "";
  };

  // Handle input changes
  const handleInputChange =
    (field: keyof EmailFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

  //Validate all fields
  const validateForm = () => {
    const firstNameValid = validateField("firstName", formData.firstName);
    const lastNameValid = validateField("lastName", formData.lastName);
    const emailValid = validateField("email", formData.email);
    return firstNameValid && lastNameValid && emailValid;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
    });
    setFormErrors({
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  // Clear all errors
  const clearErrors = () => {
    setFormErrors({
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  //handlers
  const handleClose = () => {
    setEmailDialogOpen(false);
  };

  const onEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (savedProviderList && savedProviderList.length > 0) {
      const now = currentDateTimeVal();
      setCurrentDateTime(now);
      setEmailSent(true);
    }
  };

  const sendEmail = async (blob: Blob) => {
    await Services.SendEmail(
      blob,
      formData.email,
      formData.firstName,
      formData.lastName
    );
    setEmailSent(false);
    setEmailDialogOpen(false);
    resetForm();
    setEmailNotifierState(true);
    setEmailNotifierDetails({
      message: StatusMessages.SuccessMessages.EmailSuccessToastMessage,
      mode: "success",
    });
  };

  return {
    formData,
    formErrors,
    currentDateTime,
    isEmailSent,
    savedProviderList,
    servicesTag,
    setEmailSent,
    handleInputChange,
    validateForm,
    validateField,
    resetForm,
    clearErrors,
    handleClose,
    onEmailSubmit,
    sendEmail,
  };
};

export default useEmailForm;
