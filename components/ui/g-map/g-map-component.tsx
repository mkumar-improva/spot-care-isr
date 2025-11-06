"use client";

import { Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <div
      className={`nc-AnyReactComponent relative  ${className}`}
      data-nc-id="AnyReactComponent"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Plot */}
      {pathname?.startsWith("/detail-screen") ? (
        <div className="text-[#e71c22] bg-white">
          <HugeiconsIcon
            icon={Location01Icon}
            className="size-5 md:size-7 shrink-0"
          />
        </div>
      ) : (
        <div className="text-primary-500 bg-white">
          <div
            className={`rounded-full ${
              isSelected || isOpen
                ? "size-5 bg-primary-600"
                : "bg-neutral-400 size-4"
            }  flex items-center justify-center`}
          >
            <div
              className={`${
                isSelected || isOpen
                  ? "size-2 bg-neutral-400"
                  : "size-3 bg-primary-600"
              } bg-primary-600 rounded-full z-10 `}
            ></div>
          </div>
        </div>
      )}
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
