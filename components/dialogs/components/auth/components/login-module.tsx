"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ViewOffSlashIcon,
  ViewIcon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import TextField from "@/components/ui/TextField/TextField";
import useLogin from "@/hooks/auth/use-login";
import Notifier from "@/components/ui/Notifier/Notifier";

const LoginModule = () => {
  const {
    formData,
    formErrors,
    notifierState,
    showPassword,
    isVerificationPending,
    NotifierDetails,
    email,
    isFormValid,
    hasErrors,
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
  } = useLogin();

  return (
    <div className="w-full md:w-1/2 p-2 xsm:p-4 md:p-8 text-center align-middle justify-center">
      {/* Render Login Form */}
      <div className="w-full flex flex-col items-start justify-start py-[11px] gap-2">
        {/* Login Header */}
        <div className="w-full flex flex-col items-start justify-start gap-[.5rem]">
          <h3 className="text-2xl ms:text-[32px] font-medium text-left">
            Welcome back👋
          </h3>
          <h4 className="font-normal text-left text-sm ms:text-base text-gray-500 pl-1">
            Please sign in to continue
          </h4>
        </div>
        {/* Login Notifier */}
        <div
          className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${
            notifierState ? "my-1" : "my-0"
          }`}
        >
          <div
            className={`transform transition-all duration-300 ease-in-out ${
              notifierState
                ? "opacity-100 scale-100 max-h-20 mb-0"
                : "opacity-0 scale-95 max-h-0 mb-0"
            }`}
          >
            <Notifier
              notifierState={notifierState}
              message={NotifierDetails.message}
              mode={NotifierDetails.mode}
              link={NotifierDetails.link}
              onClick={NotifierDetails.onClick}
              onClose={handleNotifierClose}
            />
          </div>
        </div>
        {/* Login Form */}
        <form
          onKeyDown={handler}
          onSubmit={onSubmit}
          className={`w-full flex flex-col items-start justify-start gap-4`}
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
          <div className="w-full text-left relative">
            <TextField
              label="Password"
              placeHolder=" "
              type={showPassword ? "text" : "password"}
              error={formErrors.password}
              value={formData.password}
              onChange={handleInputChange("password")}
              className=""
              required={false}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 flex items-center text-sm text-neutral-500"
            >
              <HugeiconsIcon
                icon={showPassword ? ViewOffSlashIcon : ViewIcon}
                size={20}
                color="currentColor"
              />
            </button>
          </div>
          <div className="w-full text-right">
            <span
              className="text-sm text-primary-500 hover:underline cursor-pointer font-normal"
              onClick={openForgotPassword}
            >
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <div className="w-full flex flex-col items-start justify-start gap-2 mt-[.1rem]">
            <ButtonPrimary
              className="bg-primary-700 font-medium text-white px-6 py-2 text-base hover:bg-primary-800 transition-colors duration-200 ease-in-out rounded-md w-full"
              type="submit"
            >
              Login
            </ButtonPrimary>
            {/* Sign Up Link - Outside form */}
            <div className="w-full text-sm text-gray-500 text-center">
              Don't have account?{" "}
              <span
                className={`text-primary-500 hover:underline cursor-pointer font-normal`}
                onClick={onSignupClick}
              >
                Sign up
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModule;
