import React, { useState, FC } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ViewOffSlashIcon,
  ViewIcon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import TextField from "@/components/ui/TextField/TextField";
import Notifier from "@/components/ui/Notifier/Notifier";
import { useChangePasswordTab } from "@/hooks/account/use-change-password-tab";
import useAccountStore from "@/store/account/account-store";

interface ChangePasswordTabProps {
  onLogout: () => void;
}

const ChangePasswordTab: FC<ChangePasswordTabProps> = ({ onLogout }) => {
  const [showCurrentPassword, setCurrentShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { notifierState, notifierDetails, hideNotifier } = useAccountStore();
  
  const {
    passwordData,
    passwordErrors,
    profileLoader,
    handlePasswordChange,
    handleBlur,
    handleSubmit,
    handleKeyDown,
  } = useChangePasswordTab({ onLogout });

  const toggleCurrentPasswordVisibility = () => {
    setCurrentShowPassword((prev) => !prev);
  };
  
  const toggleNewPasswordVisibility = () => {
    setNewShowPassword((prev) => !prev);
  };
  
  const toggleConfirmPasswordVisiblity = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <form
      className="w-full flex flex-col items-start justify-start gap-4"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      {/* Current Password */}
      <div className="w-full text-left relative">
        <TextField
          label="Current password"
          placeHolder=" "
          name="currentPassword"
          type={showCurrentPassword ? "text" : "password"}
          error={passwordErrors.currentPassword}
          value={passwordData.currentPassword ?? ""}
          onChange={handlePasswordChange}
          onBlur={handleBlur}
          className=""
          required={false}
          autoFocus
        />
        <button
          type="button"
          onClick={toggleCurrentPasswordVisibility}
          className="absolute right-3 top-9 flex items-center text-sm text-neutral-500"
        >
          <HugeiconsIcon
            icon={showCurrentPassword ? ViewOffSlashIcon : ViewIcon}
            size={20}
            color="currentColor"
          />
        </button>
      </div>
      
      {/* New Password */}
      <div className="w-full text-left relative">
        <TextField
          label="New password"
          placeHolder=" "
          name="newPassword"
          type={showNewPassword ? "text" : "password"}
          error={passwordErrors.newPassword}
          value={passwordData.newPassword ?? ""}
          onChange={handlePasswordChange}
          onBlur={handleBlur}
          className=""
          required={false}
        />
        <button
          type="button"
          onClick={toggleNewPasswordVisibility}
          className="absolute right-3 top-9 flex items-center text-sm text-neutral-500"
        >
          <HugeiconsIcon
            icon={showNewPassword ? ViewOffSlashIcon : ViewIcon}
            size={20}
            color="currentColor"
          />
        </button>
      </div>
      
      {/* Confirm Password */}
      <div className="w-full text-left relative">
        <TextField
          label="Confirm password"
          placeHolder=" "
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          error={passwordErrors.confirmPassword}
          value={passwordData.confirmPassword ?? ""}
          onChange={handlePasswordChange}
          onBlur={handleBlur}
          className=""
          required={false}
        />
        <button
          type="button"
          onClick={toggleConfirmPasswordVisiblity}
          className="absolute right-3 top-9 flex items-center text-sm text-neutral-500"
        >
          <HugeiconsIcon
            icon={showConfirmPassword ? ViewOffSlashIcon : ViewIcon}
            size={20}
            color="currentColor"
          />
        </button>
      </div>
      
      {/* Notifier */}
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
            message={notifierDetails.message}
            mode={notifierDetails.mode}
            onClose={hideNotifier}
          />
        </div>
      </div>
      
      {/* Update button */}
      <ButtonPrimary  loading={profileLoader} type="submit">
        Update
      </ButtonPrimary>
    </form>
  );
};

export default ChangePasswordTab;
