"use client";

import { Providers } from "@/types/provider-details";
import { FC } from "react";
import ProviderContent from "./provider-content";
import ProviderSliderGallery from "./provider-slider-gallery";

interface ProviderCardProps {
  data: Providers;
  isLite?: boolean;
  fromDrawer?: boolean;
}

const ProviderCard: FC<ProviderCardProps> = ({
  data,
  isLite = false,
  fromDrawer = false,
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
      <div className="flex flex-col-reverse md:flex-row lg:flex-col-reverse xl:flex-row lg:gap-0">
        <ProviderContent data={data} isLite={isLite} fromDrawer={fromDrawer} />
        {!isLite && data && data.images.length > 0 && (
          <ProviderSliderGallery data={data} fromDrawer={fromDrawer} />
        )}
      </div>
    </div>
  );
};

export default ProviderCard;
