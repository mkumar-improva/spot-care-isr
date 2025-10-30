"use client";

import { FC, useState } from "react";
import { Providers } from "@/types/provider-details";
import { TitleCase } from "@/utils/converter";
import Tooltip from "../tool-tip/tool-tip";
import { formatAddressFromLocations } from "@/utils/converter";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Location01Icon,
  Calling02Icon,
  Delete02Icon,
  Mail01Icon,
  FavouriteIcon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import { StarIcon } from "@hugeicons-pro/core-solid-rounded/index";
import { formatPhoneNumber } from "@/utils/converter";
import google from "@/assets/logos/google.png";
import Image from "next/image";
import medicare from "@/assets/logos/medicare.png";

interface ProviderContentProps {
  data: Providers;
  isLite: boolean;
  fromDrawer: boolean;
}

const ProviderContent: FC<ProviderContentProps> = ({
  data,
  isLite,
  fromDrawer,
}) => {
  //state
  const [isSelected, setIsSelected] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  //determine if we should show reviews
  const shouldShowReviews = data.agrReview || data.rating;
  const ratingToShow = data.agrReview?.reviews.rating;
  return (
    <div
      className="flex-1 flex flex-col items-start justify-start relative px-[.75rem] 
           lg:px-[1rem] pt-[1rem] pb-[.75rem] md:pt-[1rem] md:pb-[.75rem] lg:pt-[1rem] gap-[.65rem]"
    >
      {/* Header section */}
      <Tooltip
        text={TitleCase(data.name.replace("''", "'"))}
        position={"left-[0px] top-[30px]"}
      >
        <p className="text-base font-medium capitalize">
          <span
            className={`line-clamp-1 ${
              !isLite && !fromDrawer ? "hover:underline cursor-pointer" : ""
            } max-w-[15rem] xsm:max-w-[22.5rem]  sm:max-w-[27rem] lg:max-w-[28rem] xl:max-w-[30rem] 2xl:max-w-[35rem] text-ellipsis pr-1`}
          >
            {TitleCase(data.name.replace("''", "'"))}
          </span>
        </p>
      </Tooltip>
      {/* Body Section */}
      <div className={`flex items-start justify-start flex-col gap-[.8rem]`}>
        {/* Address Section */}
        <div className={`flex items-center justify-start gap-[.5rem]`}>
          <HugeiconsIcon
            icon={Location01Icon}
            className="w-[20px] h-[20px] text-neutral-500 flex-shrink-0"
          />
          <div className="flex items-center justify-start flex-wrap gap-[.5rem]">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              <span className="text-gray-500 font-semibold">
                {data.distanceInMiles} mi
              </span>
              &nbsp;&nbsp;&bull;&nbsp;&nbsp;
              {formatAddressFromLocations(data.locations)}
            </span>
          </div>
        </div>
        {/* Contact Section */}
        <div className="flex items-center justify-start gap-4 flex-wrap xsm:flex-nowrap">
          {/* Phone number section */}
          <div className="flex items-center justify-start gap-[.5rem] flex-nowrap flex-shrink-0">
            <HugeiconsIcon
              icon={Calling02Icon}
              className="size-5 text-neutral-500 flex-shrink-0"
            />
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {data.phoneNumber && data.phoneNumber.length > 0
                ? formatPhoneNumber(data.phoneNumber[0].phoneNumber)
                : "Unavailable"}{" "}
            </span>
          </div>
          {/* Email Section */}
          {data.email && data.email.length > 0 && (
            <div className="flex items-center justify-start gap-[.5rem] flex-nowrap xsm:max-w-[12rem] ms:max-w-[30rem] xsm:flex-1">
              <HugeiconsIcon
                icon={Mail01Icon}
                className="size-5 text-neutral-500 flex-shrink-0"
              />
              <span className="text-sm text-neutral-500 dark:text-neutral-400 xsm:truncate">
                {data.email && data.email !== "" ? data.email : "unavailable"}
              </span>
            </div>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex items-center justify-start gap-2 gap-y-3 ms:gap-4 flex-wrap ms:flex-nowrap">
          {/* Save Button */}
          {!fromDrawer && (
            <div
              className={`group border rounded-lg flex items-center gap-[5px] px-[.5rem] py-[.25rem] cursor-pointer transition-colors duration-200
              ${
                isSelected
                  ? "border-red-500 text-red-500"
                  : isTouchDevice
                  ? "border-neutral-300 text-neutral-500 active:border-red-500 active:text-red-500"
                  : "border-neutral-300 text-neutral-500 hover:border-red-500 hover:text-red-500"
              }`}
            >
              <HugeiconsIcon
                icon={FavouriteIcon}
                className={`size-[1.15rem] flex-shrink-0 ${
                  isSelected
                    ? "text-red-500"
                    : isTouchDevice
                    ? "text-neutral-500 group-active:text-red-500"
                    : "text-neutral-500 group-hover:text-red-500"
                }`}
                fill="currentColor"
              />
              <span
                className={`text-sm  ${
                  isSelected
                    ? "text-red-500"
                    : isTouchDevice
                    ? "text-neutral-500 group-active:text-red-500"
                    : "text-neutral-500 group-hover:text-red-500"
                }`}
              >
                Save
              </span>
            </div>
          )}
          {/* Remove Button */}
          {!isLite && fromDrawer && (
            <div className="border rounded-lg flex items-center gap-[5px] px-[.5rem] py-[.29rem] border-red-500 text-red-500">
              {" "}
              <HugeiconsIcon
                icon={Delete02Icon}
                className="size-[1.15rem] flex-shrink-0 "
              />
              <span className="text-sm">Remove</span>
            </div>
          )}
          {/* Review section */}
          {shouldShowReviews && (
            <>
              {/* Google review */}
              {ratingToShow ? (
                <div className="flex rounded-lg items-center gap-[.5rem] mt-[2px]">
                  <Image
                    alt="Google Review"
                    src={google}
                    className="w-[3.25rem]"
                  />
                  <div className="flex items-center justify-start gap-[.25rem] mb-[.15rem]">
                    <HugeiconsIcon
                      icon={StarIcon}
                      className="text-[#f49d0a] size-3"
                    />
                    <span className="text-sm font-medium text-neutral-500">
                      ({ratingToShow || ""})
                    </span>
                  </div>
                </div>
              ) : null}
              {/* CMS Rating */}
              {data.isRatingsAvailable && (
                <div className="flex rounded-lg items-center gap-[.25rem]">
                  <Image
                    alt="Medicare Rating"
                    src={medicare}
                    className="w-[6rem]"
                  />
                  <div className="flex items-center justify-start gap-[.25rem] mb-[.15rem]">
                    <HugeiconsIcon
                      icon={StarIcon}
                      className="text-[#f49d0a] size-3"
                    />
                    <span className="text-sm font-medium text-neutral-500">
                      ({data.rating?.overall ?? 0})
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderContent;
