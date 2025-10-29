"use client";

import {
  Link04Icon,
  Mail01Icon,
} from "@hugeicons-pro/core-stroke-standard/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useShareProviderDialog } from "@/hooks/dialog/share-provider-hook";
import { formatPhoneNumber } from "@/utils/converter";
import { formatAddressFromLocations } from "@/utils/converter";
import Notifier from "@/components/ui/Notifier/Notifier";
import ButtonClose from "@/components/ui/button/types/button-close";

interface SharePlatform {
  title: string;
  icon: any;
  onclick: () => void | Promise<void>;
}

export const ShareDialog = () => {
  const {
    selectedProviderDetail,
    notifierState,
    notifierDetails,
    handleMailToShare,
    handleCopyLink,
    handleNotifierClose,
    handleClose,
  } = useShareProviderDialog();

  const socialPlatforms: SharePlatform[] = [
    {
      title: "Email",
      icon: Mail01Icon,
      onclick: () => {
        handleMailToShare();
      },
    },
    {
      title: "Link",
      icon: Link04Icon,
      onclick: async () => {
        await handleCopyLink();
      },
    },
  ];

  return (
    <div className="relative w-[80vw] md:w-[35rem] flex flex-col gap-0">
      {/* Dialog Content */}
      <div className="flex-1 justify-center items-center sm:space-y-6 relative">
        <div className="flex flex-row text-neutral-700 dark:text-neutral-300 text-center justify-between items-center border-b dark:border-neutral-800 p-4 relative">
          <p className="text-2xl font-bold flex-grow">Share</p>
          <span className="absolute right-3 top-3">
            <ButtonClose onClick={handleClose} isHover={false} />
          </span>
        </div>
        {selectedProviderDetail?.images &&
          selectedProviderDetail?.images.length > 0 && (
            <img
              alt="Provider"
              src={selectedProviderDetail?.images[0].imagePath}
              className=" w-full h-[10rem] rounded-xl sm:hidden"
            />
          )}
        <div className="w-full flex flex-col text-neutral-700 dark:text-neutral-300 justify-center items-start gap-y-6 pl-6 pr-5 pt-0 pb-5 mt-[1.5rem] sm:mt-0">
          {/* Provider summary */}
          <div className="w-full flex sm:flex-row flex-col items-start sm:item-center justify-start gap-4">
            {selectedProviderDetail?.images &&
              selectedProviderDetail?.images.length > 0 && (
                <img
                  alt="Provider"
                  src={selectedProviderDetail?.images[0].imagePath}
                  className="hidden sm:block sm:w-[4.3rem] sm:h-[4rem] w-[8rem] h-[5rem] rounded-xl "
                />
              )}
            <div className="flex-1 flex flex-col flex-wrap items-start justify-start gap-1">
              <p className="text-base text-neutral-800 dark:text-neutral-200 font-bold">
                {selectedProviderDetail?.name.replace("''", "'")}
              </p>
              <p className="text-sm text-neutral-500">
                <span className="text-sm text-neutral-500 font-semibold">
                  {selectedProviderDetail?.distanceInMiles} mi
                </span>
                &nbsp;&nbsp; •&nbsp;&nbsp;{" "}
                {formatAddressFromLocations(
                  selectedProviderDetail?.locations || []
                )}
              </p>

              {selectedProviderDetail?.email && (
                <p className="text-sm text-neutral-500">
                  {selectedProviderDetail.email.toLowerCase()}
                </p>
              )}

              {selectedProviderDetail?.website && (
                <p className="text-sm text-neutral-500">
                  {selectedProviderDetail.website}
                </p>
              )}
              {selectedProviderDetail?.phoneNumber &&
                selectedProviderDetail?.phoneNumber[0]?.phoneNumber && (
                  <p className="text-sm text-neutral-500">
                    {formatPhoneNumber(
                      selectedProviderDetail.phoneNumber[0].phoneNumber
                    )}
                  </p>
                )}
            </div>
          </div>
          
          {/* Share list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {socialPlatforms.map((platform, index) => (
              <div
                key={index}
                className="flex items-center justify-start border text-neutral-500 border-neutral-300 dark:border-neutral-700 px-3 py-2 rounded-xl gap-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                onClick={platform.onclick}
              >
                <HugeiconsIcon
                  className="text-neutral-500 size-[1.25rem]"
                  icon={platform.icon}
                />
                <p className="text-base text-neutral-500 leading-[1.5rem]">
                  {platform.title}
                </p>
              </div>
            ))}
          </div>
        </div>
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
            showDefaultMessage={false}
            onClose={handleNotifierClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;
