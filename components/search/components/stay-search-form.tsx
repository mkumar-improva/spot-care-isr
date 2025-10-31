"use client";

import { FC, useRef, useState } from "react";
import CareTypeInput from "./care-type-input";
import LocationInput from "./location-input";
import RadiusInput from "./radius-input";
import { useOutsideAlerter } from "@/hooks/common/use-outsider-click";
import useHeaderUiStore from "store/ui/header-ui-store";

interface StaySearchFormProps {
  onFocusScroll?: () => void;
}

const StaySearchForm: FC<StaySearchFormProps> = ({ onFocusScroll }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRadiusOpen, setRadiusOpen] = useState(false);
  const [careSearchShowVerticalLine, setCareSearchShowVerticalLine] =
    useState<boolean>(true);
  const [radiusSearchShowVerticalLine, setRadiusSearchShowVerticalLine] =
    useState<boolean>(true);

  //store import
  const { isHomePage } = useHeaderUiStore();

  useOutsideAlerter(
    containerRef,
    () => {
      setCareSearchShowVerticalLine(true);
      setRadiusSearchShowVerticalLine(true);
      setRadiusOpen(false);
    },
    ".pac-container"
  );

  return (
    <div
      ref={containerRef}
      className={`mx-auto relative  flex rounded-full  bg-white dark:bg-neutral-800 ${
        isHomePage
          ? "shadow-xl dark:shadow-2xl ring ring-neutral-50"
          : "border border-neutral-200 dark:border-neutral-6000"
      }`}
    >
      <CareTypeInput
        className="flex-1"
        mobileClassName=""
        setRadiusOpen={setRadiusOpen}
        isRadiusOpen={isRadiusOpen}
        setCareSearchShowVerticalLine={setCareSearchShowVerticalLine}
        setRadiusSearchShowVerticalLine={setRadiusSearchShowVerticalLine}
        onFocusScroll={onFocusScroll}
      />
      <div
        className={`self-center h-8 py-2 border-r ${
          careSearchShowVerticalLine
            ? "border-slate-200 dark:border-slate-700 "
            : "border-transparent"
        }`}
      ></div>
      <LocationInput
        className="flex-1"
        setCareSearchShowVerticalLine={setCareSearchShowVerticalLine}
        setRadiusSearchShowVerticalLine={setRadiusSearchShowVerticalLine}
        mobileClassName="py-[0.75rem]"
        onFocusScroll={onFocusScroll}
      />
      <div
        className={`self-center h-8 py-2 border-r ${
          radiusSearchShowVerticalLine
            ? "border-slate-200 dark:border-slate-700"
            : "border-transparent"
        }`}
      ></div>
      <RadiusInput
        className="flex-1"
        mobileClassName=""
        setCareSearchShowVerticalLine={setCareSearchShowVerticalLine}
        setRadiusSearchShowVerticalLine={setRadiusSearchShowVerticalLine}
        onFocusScroll={onFocusScroll}
      />
    </div>
  );
};

export default StaySearchForm;
