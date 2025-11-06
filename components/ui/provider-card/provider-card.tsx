"use client";

import { Providers } from "@/types/provider-details";
import { FC, Fragment } from "react";
import ProviderContent from "./provider-content";
import ProviderSliderGallery from "./provider-slider-gallery";

interface ProviderCardProps {
  data: Providers;
  isLite?: boolean;
  fromDrawer?: boolean;
  navigating?: boolean;
  handleProviderClick?: (provider: Providers) => void;
}

const ProviderCard: FC<ProviderCardProps> = ({
  data,
  isLite = false,
  fromDrawer = false,
  navigating = false,
  handleProviderClick = () => {},
}) => {
  return (
    <div
      className={`nc-StayCardH w-full  relative bg-white dark:bg-neutral-900 border 
        border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden 
        hover:shadow-lg transition-shadow will-change-transform cursor-pointer min-h-[10.75rem] ${
          data.images && data.images.length > 0
            ? "pb-[.6rem] md:pb-[0rem] lg:pb-[.6rem] xl:pb-[0rem]"
            : "pb-[0rem]"
        }`}
      data-nc-id="StayCardH"
    >
      {/* Loader shown when this card is navigating to detail (uses same spinner SVG as login button) */}
      {navigating && (
        <div className="absolute right-4 top-4 z-50 bg-primary-700 rounded-full w-8 h-8 flex items-center justify-center">
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      <div className="flex flex-col-reverse md:flex-row lg:flex-col-reverse xl:flex-row lg:gap-0">
        <div className="w-full" onClick={() => handleProviderClick(data)}>
          <ProviderContent
            data={data}
            isLite={isLite}
            fromDrawer={fromDrawer}
          />
        </div>
        {!isLite && data && data.images.length > 0 && (
          <ProviderSliderGallery data={data} fromDrawer={fromDrawer} />
        )}
      </div>
    </div>
  );
};

export default ProviderCard;
