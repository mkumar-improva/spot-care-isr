"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  FC,
  KeyboardEvent,
} from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ServiceIcon } from "@hugeicons-pro/core-stroke-standard/index";
import useSearchUiStore from "store/ui/search-ui-store";
import ClearDataButton from "@/components/ui/button/types/clear-data-button";
import useCareTypeInput from "@/hooks/search/use-care-type-input";
import { RenderGroupedCareCategories } from "./render-grouped-care-categories";

export interface CareTypeInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  autoFocus?: boolean;
  mobileClassName?: string;
  onFocusScroll?: () => void;
  setRadiusOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isRadiusOpen?: boolean;
  setCareSearchShowVerticalLine?: React.Dispatch<React.SetStateAction<boolean>>;
  setRadiusSearchShowVerticalLine?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const CareTypeInput: FC<CareTypeInputProps> = ({
  autoFocus = false,
  placeHolder = "Type of care",
  desc = "What are you looking?",
  className = "nc-flex-1.5",
  mobileClassName = "",

  onFocusScroll = () => {},
  setRadiusOpen = () => {},
  isRadiusOpen,
  setCareSearchShowVerticalLine,
  setRadiusSearchShowVerticalLine,
}) => {
  const {
    careTypes,
    containerRef,
    inputRef,
    listRef,
    careTypeValue,
    careTypeOpen,
    highlightedIndex,
    filteredCareTypes,
    setCareTypeValue,
    setCareTypeOpen,
  } = useCareTypeInput();

  //handlers
  const handleSelectLocation = (item: string, id: number) => {
    setCareTypeValue(item);
    setCareTypeOpen(false);
    setCareSearchShowVerticalLine?.(true);
  };

  //renderers
  const renderRecentSearches = () => {
    return RenderGroupedCareCategories({
      groupedCareCategories: filteredCareTypes,
      highlightedIndex: highlightedIndex,
      handleSelectLocation: handleSelectLocation,
    });
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      {/* Care Type Input Container */}
      <div
        onClick={() => {
          setCareSearchShowVerticalLine?.(false);
          setRadiusSearchShowVerticalLine?.(true);
          setCareTypeOpen(true);
          inputRef.current?.focus();
          onFocusScroll();
        }}
        className={`flex z-10 flex-1 relative pl-[1.3rem] pr-0 py-[.75rem] lg:px-[1.75rem] flex-shrink-0 items-center space-x-3 
            cursor-pointer focus:outline-none text-left ${
              careTypeOpen && !mobileClassName ? "nc-hero-field-focused" : ""
            } ${mobileClassName || ""}`}
      >
        {/* Icon */}
        <div className="text-neutral-300 dark:text-neutral-400 pt-1">
          <HugeiconsIcon icon={ServiceIcon} className="size-6 lg:size-7" />
        </div>
        {/* Care Type Input */}
        <div className="flex-grow">
          <input
            className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none 
            focus:placeholder-neutral-300 text-base font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 
            truncate"
            placeholder={placeHolder}
            value={careTypeValue}
            autoFocus={careTypeOpen}
            onChange={(e) => setCareTypeValue(e.target.value)}
            ref={inputRef}
            onFocus={() => onFocusScroll()}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light">
            <span className="line-clamp-1">{!!careTypeValue ? placeHolder : desc}</span>
          </span>
          {careTypeValue && (
            <ClearDataButton
              onClick={() => {
                setCareTypeValue("");
              }}
            />
          )}
        </div>
      </div>
      {careTypes && careTypes.length > 0 && careTypeOpen && (
        <div
          ref={listRef}
          className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800
         top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto scrollbar-hide"
        >
          {renderRecentSearches()}
        </div>
      )}
    </div>
  );
};

export default CareTypeInput;
