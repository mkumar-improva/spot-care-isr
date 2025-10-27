"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ViewOffSlashIcon,
  ViewIcon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import TextField from "@/components/ui/TextField/TextField";
import Notifier from "@/components/ui/Notifier/Notifier";
import useResetPassword from "@/hooks/reset-password/use-reset-password";
import ResetPasswordConfirmation from "./reset-password-confirmation";

const ResetPasswordForm = () => {
  const {
    formData,
    formErrors,
    notifierState,
    showPassword,
    showConfirmPassword,
    NotifierDetails,
    isPasswordReset,
    resetForm,
    clearErrors,
    validateField,
    validateForm,
    onSubmit,
    handler,
    handleInputChange,
    handleNotifierClose,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    setNotifierDetails,
    setNotifierState,
    handleLogin,
  } = useResetPassword();

  return (
    <div className="w-full md:w-1/2 p-2 xsm:p-4 md:p-8 text-center align-middle justify-center">
      {isPasswordReset ? (
        <ResetPasswordConfirmation callback={handleLogin} />
      ) : (
        <div className="w-full flex flex-col items-start justify-start py-[11px] gap-2">
          {/* Reset Password Header */}
          <div className="w-full flex flex-col items-start justify-start gap-[.5rem]">
            <h3 className="text-2xl ms:text-[32px] font-medium text-left">
              Reset Password
            </h3>
            <h4 className="font-normal text-left text-sm ms:text-base text-gray-500 pl-1">
              Choose a new password to secure your account
            </h4>
          </div>
          {/* Reset Password Notifier */}
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
                onClose={handleNotifierClose}
              />
            </div>
          </div>
          {/* Reset Password Form */}
          <form
            onSubmit={onSubmit}
            onKeyDown={handler}
            className={`w-full flex flex-col items-start justify-start gap-4`}
          >
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
            <div className="w-full text-left relative">
              <TextField
                label="Confirm password"
                placeHolder=" "
                type={showConfirmPassword ? "text" : "password"}
                error={formErrors.confirmPassword}
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                className=""
                required={false}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-9 flex items-center text-sm text-neutral-500"
              >
                <HugeiconsIcon
                  icon={showConfirmPassword ? ViewOffSlashIcon : ViewIcon}
                  size={20}
                  color="currentColor"
                />
              </button>
            </div>
            {/* Reset password button */}
            <ButtonPrimary
              className="bg-primary-700 font-medium text-white px-6 py-2 text-base hover:bg-primary-800 transition-colors duration-200 
            ease-in-out rounded-md w-full mt-2"
              type="submit"
            >
              Reset your password
            </ButtonPrimary>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
