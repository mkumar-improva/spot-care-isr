"use client";
import React, { useState, useRef, useEffect, FC } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Config } from "@/constants/config";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import useSearchUiStore from "store/ui/search-ui-store";
import ClearDataButton from "@/components/ui/button/types/clear-data-button";

export interface LocationInputProps {
  setShowVerticalLine?: React.Dispatch<React.SetStateAction<boolean>>;
  placeHolder?: string;
  desc?: string;
  className?: string;
  autoFocus?: boolean;
  mobileClassName?: string;
  onFocusScroll?: () => void;
  isFromMobileSearch?: boolean;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export type AddressComponents = AddressComponent[];

const LocationInput: FC<LocationInputProps> = ({
  setShowVerticalLine,
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you looking?",
  className = "nc-flex-1.5",
  mobileClassName = "",
  onFocusScroll = () => {},
  isFromMobileSearch = false,
}) => {
  /*----------Begining of Store Import----------*/
  const { isMapLoaded, locationValue, setLocationValue } = useSearchUiStore();
  /*----------End of Store Import----------*/

  /*--Begining of refs----------*/
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  /*----------End of refs----------*/

  /*----------Begining of state ----------*/
  const [showPopover, setShowPopover] = useState(autoFocus);
  /*----------End of state ----------*/

  if (!isMapLoaded) {
    return (
      <div className="flex-1 flex items-center justify-start">
        <HugeiconsIcon icon={Location01Icon} className="size-6 lg:size-7" />
        <p className="text-neutral-900 text-base">Loading...</p>
      </div>
    );
  }
  return (
    <div
      className={`relative flex ${className} xl:dark:bg-gray-800 xl:bg-white xl:px-0 px-5 sm:px-0 md:pr-0 md::pl-3
        }`}
      ref={containerRef}
    >
      {/* Location Container */}
      <div
        className={`flex z-10 flex-1 relative pl-[1rem] pr-[1rem] lg:px-[1.75rem] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
          showPopover ? "nc-hero-field-focused" : ""
        } dark:text-white text-black ${mobileClassName}`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <HugeiconsIcon icon={Location01Icon} className="size-6 lg:size-7" />
        </div>
        <div className="flex-grow">
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            className="text-base"
          >
            <input
              className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 text-base
                 font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
              placeholder={placeHolder}
              value={locationValue}
              autoFocus={showPopover}
              onChange={(e) => setLocationValue(e.currentTarget.value)}
              ref={inputRef}
              required
            />
          </Autocomplete>
          <span className="block mt-0.5 text-sm text-neutral-400 font-light dark:text-neutral-300">
            <span
              className="line-clamp-1"
              onClick={() => {
                inputRef.current?.focus();
                setShowPopover(true);
                onFocusScroll();
              }}
            >
              {!!locationValue ? placeHolder : desc}
            </span>
          </span>
          {locationValue  && (
            <ClearDataButton
              onClick={() => {
                setLocationValue("");
                inputRef.current?.focus();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
