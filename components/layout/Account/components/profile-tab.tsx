import ButtonPrimary from "@/components/ui/button/types/button-primary";
import React, { FC } from "react";
import { formatPhoneNumber } from "@/utils/converter";
import TextField from "@/components/ui/TextField/TextField";
import { NotifierModel } from "@/types/notifier-model";
import Notifier from "@/components/ui/Notifier/Notifier";
import { KEYS } from "@/constants/KeyConstants";
import { useProfileTab } from "@/hooks/account/use-profile-tab";
import useAccountStore from "@/store/account/account-store";

interface ProfileTabProps {
  onLogout: () => void;
}

const ProfileTab: FC<ProfileTabProps> = ({ onLogout }) => {
  const { notifierState, notifierDetails, hideNotifier } = useAccountStore();
  
  const {
    formData,
    formErrors,
    profileLoader,
    handleInputChange,
    handleBlur,
    handleSubmit,
  } = useProfileTab({ onLogout });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form
      className="w-full flex flex-col items-start justify-start gap-4"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className="w-full flex flex-col items-start justify-start">
        <div className="w-full flex items-start justify-start sm:items-start sm:justify-between gap-4 sm:gap-2 flex-col sm:flex-row">
          <div className="w-full sm:flex-1">
            <TextField
              name="firstName"
              label="First name"
              placeHolder=" "
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="text-left"
              required={false}
              maxLength={20}
              error={
                formErrors.firstName
                  ? formErrors.firstName
                  : formErrors.lastName
                  ? " "
                  : ""
              }
              autoFocus
            />
          </div>
          <div className="w-full sm:flex-1">
            <TextField
              name="lastName"
              label="Last name"
              placeHolder=" "
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="text-left"
              required={false}
              maxLength={20}
              error={
                formErrors.lastName
                  ? formErrors.lastName
                  : formErrors.firstName
                  ? " "
                  : ""
              }
            />
          </div>
        </div>
      </div>
      <TextField
        name="email"
        label="Email"
        placeHolder=" "
        error={formErrors.email}
        value={formData.email}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="text-left"
        required={false}
        disabled={true}
      />
      <TextField
        name="phone"
        label="Phone number"
        type="text"
        placeHolder=" "
        error={formErrors.phone}
        value={formatPhoneNumber(formData.phone)}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="text-left"
        required={false}
      />
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

export default ProfileTab;
