"use client";

import { Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import ProviderCard from "../provider-card/provider-card";
import { Providers } from "@/types/provider-details";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon } from "@hugeicons-pro/core-solid-rounded/index";

export interface GMapComponentProps {
  className?: string;
  isSelected?: boolean;
  lat: number;
  lng: number;
  item: Providers;
  isList?: boolean;
}

const GMapComponent: FC<GMapComponentProps> = ({
  className = "",
  isSelected,
  item,
  isList = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ratingToShow = item.agrReview?.reviews.rating ?? 0;

  return (
    <div
      className={`nc-AnyReactComponent relative  ${className}`}
      data-nc-id="AnyReactComponent"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Plot */}
      <div className="text-primary-500 bg-white">
        <div
          className={`${
            isSelected
              ? "text-white bg-primary-700 shadow-lg"
              : "bg-primary-400 text-white shadow-md"
          } h-6 w-10 text-center p-1 rounded-md text-xs`}
        >
          ⭐ {ratingToShow.toString()}
        </div>
      </div>
      {/* InfoBox */}
      {isList && (
        <Transition
          show={isSelected || isOpen}
          as={Fragment}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute z-50 bottom-full pb-3 -left-48 xl:xl:-left-40 2xl:-left-56 w-[500px] aspect-w-1">
            <ProviderCard data={item} isLite />
          </div>
        </Transition>
      )}
    </div>
  );
};

export default GMapComponent;
