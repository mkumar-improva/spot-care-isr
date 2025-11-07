import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  Calling02Icon,
  Delete02Icon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import { ImageAdd02Icon } from "@hugeicons-pro/core-stroke-standard/index";
import Avatar from "@/components/ui/Avatar/Avatar";
import Notifier from "@/components/ui/Notifier/Notifier";
import { useAccount } from "@/hooks/account/use-account";

const RenderSidebar = () => {
  const {
    fileInputRef,
    formData,
    userDetail,
    imgLoader,
    notifierState,
    notifierDetails,
    displayName,
    displayPhone,
    displayEmail,
    handleAvatarClick,
    handleProfilePictureChange,
    removeProfilePicture,
    hideNotifier,
  } = useAccount();

  return (
    <div
      className="w-full flex flex-col items-start justify-start gap-7 sm:rounded-2xl 
    lg:border lg:border-neutral-200 dark:border-neutral-700 px-0 sm:px-6 sm:pt-6 sm:pb-0 xl:px-8 xl:pt-8 xl:pb-0"
    >
      {/* Profile picture section */}
      <div className="w-full flex items-center justify-center">
        <div className="relative rounded-full flex cursor-pointer group">
          {imgLoader ? (
            <div className="w-28 h-28 rounded-full bg-neutral-100/50 flex flex-col items-center justify-center">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
          ) : (
            <>
              <Avatar
                hasChecked
                hasCheckedClass="w-6 h-6 -top-0.5 right-2"
                sizeClass="w-28 h-28"
                imgUrl={formData.profilePicture}
                userName={formData.firstName || userDetail?.firstName || ""}
                textSize="text-5xl"
              />
              <div
                onClick={handleAvatarClick}
                className="absolute inset-0 rounded-full bg-black bg-opacity-60 hidden group-hover:flex flex-col items-center justify-center text-neutral-50 cursor-pointer"
              >
                <HugeiconsIcon
                  icon={ImageAdd02Icon}
                  size={25}
                  aria-hidden="true"
                />
                <span className="mt-1 text-xs">Change Image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                ref={fileInputRef}
                className="hidden"
              />
              <div
                className={`bg-white dark:bg-neutral-400 absolute rounded-xl bottom-2 right-0 p-1 shadow-lg ${
                  !formData.profilePicture && "hidden"
                }`}
                onClick={removeProfilePicture}
              >
                <HugeiconsIcon
                  icon={Delete02Icon}
                  size={16}
                  className="text-red-500"
                  color="currentColor"
                  strokeWidth={1.2}
                />
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* User Information */}
      <div className="w-full flex flex-col items-center justify-center ">
        <h2 className="text-2xl ms:text-[32px] font-semibold truncate text-center max-w-full px-2">
          {displayName}
        </h2>
      </div>
      
      <div className="mx-auto border-b border-neutral-200 dark:border-neutral-700 w-32"></div>
      
      {/* User Contact Details */}
      <div className="w-full flex flex-col items-start ms:items-center justify-center">
        <div className="flex flex-col items-start justify-start gap-3 w-full max-w-xs ms:max-w-sm">
          <div className="flex items-center justify-start space-x-2 w-full">
            <HugeiconsIcon
              icon={Calling02Icon}
              className="text-neutral-400 size-4 ms:size-5 shrink-0"
              color="currentColor"
              strokeWidth={1.2}
            />
            <span className="text-neutral-6000 dark:text-neutral-300 truncate text-sm ms:text-base min-w-0 flex-1">
              {displayPhone}
            </span>
          </div>
          <div className="flex items-center justify-start space-x-2 w-full">
            <HugeiconsIcon
              icon={Mail01Icon}
              className="text-neutral-400 size-4 ms:size-5 shrink-0"
              color="currentColor"
              strokeWidth={1.2}
            />
            <span className="text-neutral-6000 dark:text-neutral-300 truncate text-sm ms:text-base min-w-0 flex-1">
              {displayEmail}
            </span>
          </div>
        </div>
      </div>
      
      {/* Notifier */}
      <div
        className={`w-full md:w-3/4 lg:w-full mx-auto transition-all duration-300 ease-in-out overflow-hidden ${
          notifierState ? "mt-1 mb-4" : "my-0"
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
    </div>
  );
};

export default RenderSidebar;