"use client";
import useLogin from "@/hooks/auth/use-login";
import LoginForm from "./login-form";
import OtpInput from "./otp-input";

const LoginModule = () => {
  const {
    formData,
    formErrors,
    notifierState,
    showPassword,
    authLoader,
    loading,
    isVerificationPending,
    NotifierDetails,
    email,
    otpNotifierDetails,
    openForgotPassword,
    onSignupClick,
    handleInputChange,
    handleNotifierClose,
    handler,
    onSubmit,
    togglePasswordVisibility,
    handleOtpsubmit,
    onResendClick,
    handleOtpNotifierClose
  } = useLogin();

  return (
    <div className="w-full md:w-1/2 p-2 xsm:p-4 md:p-8 text-center align-middle justify-center">
      {!isVerificationPending ? (
        <LoginForm
          formData={formData}
          formErrors={formErrors}
          notifierState={notifierState}
          showPassword={showPassword}
          authLoader={authLoader}
          loading={loading}
          NotifierDetails={NotifierDetails}
          handleInputChange={handleInputChange}
          handleNotifierClose={handleNotifierClose}
          handler={handler}
          onSubmit={onSubmit}
          togglePasswordVisibility={togglePasswordVisibility}
          openForgotPassword={openForgotPassword}
          onSignupClick={onSignupClick}
        />
      ) : (
        <OtpInput
          loading={authLoader || loading}
          onSubmit={handleOtpsubmit}
          onResendClick={onResendClick}
          errorDetails={otpNotifierDetails.message}
          email={email}
          notifierMode={otpNotifierDetails.mode}
          heading="Complete verification"
          description="Enter the verification code sent to"
          isEmptyFieldsError={
            otpNotifierDetails.message === "Please fill in all OTP fields"
          }
          NotifierClose={handleOtpNotifierClose}
        />
      )}
    </div>
  );
};

export default LoginModule;
