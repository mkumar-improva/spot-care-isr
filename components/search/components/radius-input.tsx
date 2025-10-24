"use client";
import { FC } from "react";
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
  setCareSearchShowVerticalLine?: React.Dispatch<React.SetStateAction<boolean>>;
  setRadiusSearchShowVerticalLine?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
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
  setCareSearchShowVerticalLine,
  setRadiusSearchShowVerticalLine,
}) => {
  return (
    <RadiusPopOver
      className={className}
      mobileClassName={mobileClassName}
      placeHolder={placeHolder}
      desc={desc}
      hasButtonSubmit={hasButtonSubmit}
      onFocusScroll={onFocusScroll}
      setCareSearchShowVerticalLine={setCareSearchShowVerticalLine}
      setRadiusSearchShowVerticalLine={setRadiusSearchShowVerticalLine}
    />
  );
};

export default RadiusInput;
