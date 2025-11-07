"use client";
import React, { FC } from "react";
import useSignUp from "@/hooks/auth/use-signup";
import SignUpForm from "./signup-form";
import OtpInput from "./otp-input";

export interface PageSignupProps {
  className?: string;
  callback?: () => void;
}

const PageSignUp: FC<PageSignupProps> = ({ className, callback }) => {
  const {
    formData,
    formErrors,
    isVerificationStarted,
    email,
    showPassword,
    NotifierState,
    NotifierDetails,
    otpNotifierDetails,
    authLoader,
    loading,
    handler,
    onSubmit,
    onLoginClick,
    handleNotifierClose,
    handleInputChange,
    togglePasswordVisibility,
    onVerificationSubmit,
    onResendClick,
    handleOtpNotifierClose
  } = useSignUp();

  return (
    <div
      className={`w-full md:w-1/2 p-2 xsm:p-4 md:p-8 text-center align-middle justify-center`}
    >
      {!isVerificationStarted ? (
        <SignUpForm
          formData={formData}
          formErrors={formErrors}
          showPassword={showPassword}
          NotifierState={NotifierState}
          NotifierDetails={NotifierDetails}
          authLoader={authLoader}
          loading={loading}
          handler={handler}
          onSubmit={onSubmit}
          onLoginClick={onLoginClick}
          handleNotifierClose={handleNotifierClose}
          handleInputChange={handleInputChange}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      ) : (
        <OtpInput
          loading={authLoader || loading}
          onSubmit={onVerificationSubmit}
          onResendClick={onResendClick}
          errorDetails={otpNotifierDetails.message}
          email={email}
          notifierMode={otpNotifierDetails.mode}
          isEmptyFieldsError={
            otpNotifierDetails.message === "Please fill in all OTP fields"
          }
          NotifierClose={handleOtpNotifierClose}
        />
      )}
    </div>
  );
};

export default PageSignUp;
