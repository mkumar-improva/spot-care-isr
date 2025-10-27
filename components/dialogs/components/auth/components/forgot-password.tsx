"use client";
import React, { FC } from "react";
import TextField from "@/components/ui/TextField/TextField";
import Notifier from "@/components/ui/Notifier/Notifier";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import useForgotPassword from "@/hooks/auth/use-forgot-password";
import PasswordConfirmation from "./password-confirmation";

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
          <div
            className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${
              NotifierState ? "my-1" : "my-0"
            }`}
          >
            <div
              className={`transform transition-all duration-300 ease-in-out ${
                NotifierState
                  ? "opacity-100 scale-100 max-h-20 mb-0"
                  : "opacity-0 scale-95 max-h-0 mb-0"
              }`}
            >
              <Notifier
                notifierState={NotifierState}
                message={NotifierDetails.message}
                mode={NotifierDetails.mode}
                onClose={handleNotifierClose}
              />
            </div>
          </div>
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
              >
                Send verification link
              </ButtonPrimary>
              {/* to login */}
              <div
                className={`w-full text-sm font-normal text-center text-primary-500 hover:underline cursor-pointer`}
                onClick={() => {
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
