"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ViewOffSlashIcon,
  ViewIcon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import TextField from "@/components/ui/TextField/TextField";
import useResetPassword from "@/hooks/reset-password/use-reset-password";
import ResetPasswordConfirmation from "./reset-password-confirmation";
import NotifierSection from "@/components/ui/Notifier/notifier-section";

const ResetPasswordForm = () => {
  const {
    formData,
    formErrors,
    notifierState,
    showPassword,
    showConfirmPassword,
    NotifierDetails,
    isPasswordReset,
    authLoader,
    loading,
    onSubmit,
    handler,
    handleInputChange,
    handleNotifierClose,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
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
          <NotifierSection
            NotifierState={notifierState}
            NotifierDetails={NotifierDetails}
            handleNotifierClose={handleNotifierClose}
            margin="my-1"
          />
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
              loading={authLoader || loading}
              disabled={authLoader || loading}
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
