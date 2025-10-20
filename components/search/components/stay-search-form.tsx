"use client";

import { FC, useRef, useState } from "react";
import CareTypeInput from "./care-type-input";
import LocationInput from "./location-input";
import RadiusInput from "./radius-input";
import { useOutsideAlerter } from "@/hooks/common/use-outsider-click";

const StaySearchForm: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isCareTypeOpen, setCareTypeOpen] = useState(false);
  const [isRadiusOpen, setRadiusOpen] = useState(false);
  const [careSearchShowVerticalLine, setCareSearchShowVerticalLine] =
    useState<boolean>(true);
  const [radiusSearchShowVerticalLine, setRadiusSearchShowVerticalLine] =
    useState<boolean>(true);

  useOutsideAlerter(
    containerRef,
    () => {
      setCareSearchShowVerticalLine(true);
      setRadiusSearchShowVerticalLine(true);
      setCareTypeOpen(false);
      setRadiusOpen(false);
    },
    ".pac-container"
  );

  return (
    <div
      ref={containerRef}
      className={`mx-auto relative  flex rounded-full  bg-white border 
        border-neutral-200`}
    >
      <CareTypeInput
        className="flex-1"
        mobileClassName=""
        setRadiusOpen={setRadiusOpen}
        isRadiusOpen={isRadiusOpen}
        setCareTypeOpen={setCareTypeOpen}
        isCareTypeOpen={isCareTypeOpen}
        setCareSearchShowVerticalLine={setCareSearchShowVerticalLine}
        setRadiusSearchShowVerticalLine={setRadiusSearchShowVerticalLine}
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
      />
    </div>
  );
};

export default StaySearchForm;
