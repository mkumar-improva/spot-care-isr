"use client";
import { FC, Fragment, useState, useEffect, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons-pro/core-stroke-standard/index";
import { SolarSystem01Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import RadiusPopOver from "./radius-pop-over";

export interface RadiusInputProps {
  fieldClassName?: string;
  className?: string;
  hasButtonSubmit?: boolean;
  placeHolder?: string;
  desc?: string;
  mobileClassName?: string;
  onFocusScroll?: () => void;
  setRadiusOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isCareTypeOpen?: boolean;
  setCareTypeOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isRadiusOpen?: boolean;
}

const RadiusInput: FC<RadiusInputProps> = ({
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ flex-1 ]",
  hasButtonSubmit = true,
  placeHolder = "Distance",
  desc = "How far are you looking?",
  mobileClassName = "",
  onFocusScroll = () => {},
  setRadiusOpen = () => {},
  isCareTypeOpen,
  setCareTypeOpen = () => {},
  isRadiusOpen,
}) => {
  /*--Begining of refs----------*/
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  const popoverButtonRef = useRef<HTMLButtonElement | null>(null);
  /*----------End of refs----------*/

  /*----------Begining of state ----------*/
  const [miles, setMiles] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  /*----------End of state ----------*/

  /*----------Start of useEffect-----------*/
  useEffect(() => {
    return () => {
      setHighlightedIndex(-1);
    };
  }, []);
  /*----------End of useEffect-----------*/

  return (
    <RadiusPopOver
      className={className}
      mobileClassName={mobileClassName}
      placeHolder={placeHolder}
      desc={desc}
      miles={miles}
      popoverButtonRef={popoverButtonRef}
      hasButtonSubmit={hasButtonSubmit}
      containerRef={containerRef}
      optionRefs={optionRefs}
      onFocusScroll={onFocusScroll}
      SearchOption={() => {}}
      onClickCapture={() => {}}
    />
  );
};

export default RadiusInput;
