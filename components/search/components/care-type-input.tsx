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

export interface CareTypeInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  autoFocus?: boolean;
  mobileClassName?: string;
  onFocusScroll?: () => void;
  setRadiusOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isRadiusOpen?: boolean;
  setCareTypeOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isCareTypeOpen?: boolean;
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
  setCareTypeOpen = () => {},
  isCareTypeOpen,
}) => {
  /*----------Begining of Refs----------*/
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  /*----------End of Refs----------*/

  /*----------Begining of States----------*/
  const [value, setValue] = useState("");
  /*----------End of States----------*/

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      {/* Care Type Input Container */}
      <div
        className={`flex z-10 flex-1 relative pl-[1.3rem] pr-0 py-[.75rem] lg:px-[1.75rem] flex-shrink-0 items-center space-x-3 
            cursor-pointer focus:outline-none text-left ${
              isCareTypeOpen && !mobileClassName ? "nc-hero-field-focused" : ""
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
            value={value}
            autoFocus={isCareTypeOpen}
            onChange={(e) => setValue(e.target.value)}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CareTypeInput;
