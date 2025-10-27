"use client";
import React, { FC } from "react";
import TextField from "@/components/ui/TextField/TextField";
import Notifier from "@/components/ui/Notifier/Notifier";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import useForgotPassword from "@/hooks/auth/use-forgot-password";
import PasswordConfirmation from "./password-confirmation";
import NotifierSection from "@/components/ui/Notifier/notifier-section";

export interface ForgotPasswordProps {
  className?: string;
  callback: () => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({
  className = "",
  callback,
}) => {
  const {
    formData,
    formErrors,
    showConfirmationPopup,
    setShowConfirmationPopup,
    handleInputChange,
    handler,
    authLoader,
    loading,
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
  } = useForgotPassword();

  return (
    <div className="w-full md:w-1/2 p-2 xsm:p-4 md:p-8 text-center align-middle justify-center">
      {showConfirmationPopup ? (
        <PasswordConfirmation
          forgotPasswordEmail={formData.email}
          setConfirmationPopup={setShowConfirmationPopup}
          callback={callback}
        />
      ) : (
        <div className="w-full flex flex-col items-start justify-start py-[11px] gap-2">
          {/* Forgot Password Header */}
          <div className="w-full flex flex-col items-start justify-start gap-[.5rem]">
            <h3 className="text-2xl ms:text-[32px] font-medium text-left">
              Forgot password
            </h3>
            <h4 className="font-normal text-left text-sm ms:text-base text-gray-500 pl-1">
              Please verify your email address
            </h4>
          </div>
          {/* Notifier */}
          <NotifierSection
            NotifierState={NotifierState}
            NotifierDetails={NotifierDetails}
            handleNotifierClose={handleNotifierClose}
            margin="my-1"
          />
          {/* Forgot Password Form */}
          <form
            className={`w-full flex flex-col items-start justify-start gap-4`}
            onSubmit={onSubmit}
            onKeyDown={handler}
          >
            <TextField
              label="Email"
              placeHolder=" "
              error={formErrors.email}
              value={formData.email}
              onChange={handleInputChange("email")}
              className="text-left"
              required={false}
              autoFocus
            />
            {/* Forgot Password Button */}
            <div className="w-full flex flex-col items-start justify-start gap-2 mt-[.65rem]">
              <ButtonPrimary
                className="bg-primary-700 font-medium text-white px-6 py-2 text-base hover:bg-primary-800 transition-colors duration-200 ease-in-out rounded-md w-full"
                type="submit"
                disabled={authLoader || loading}
                loading={authLoader || loading}
              >
                Send verification link
              </ButtonPrimary>
              {/* to login */}
              <div
                className={`w-full text-sm font-normal text-center ${
                  authLoader || loading
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary-500 hover:underline cursor-pointer"
                }`}
                onClick={() => {
                  if (authLoader || loading) return;
                  callback();
                }}
              >
                Back to login
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
