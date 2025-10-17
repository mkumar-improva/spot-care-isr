"use client";

import { FC, useRef, useState } from "react";
import CareTypeInput from "./care-type-input";
import LocationInput from "./location-input";
import RadiusInput from "./radius-input";
import useSearchUiStore from "store/ui/search-ui-store";

const StaySearchForm: FC = () => {
  /*----------Begining of Store Import----------*/
  const { isShowCareVerticalLine, isShowLocationVerticalLine } =
    useSearchUiStore();
  /*----------End of Store Import----------*/

  const containerRef = useRef<HTMLDivElement>(null);

  const [isCareTypeOpen, setCareTypeOpen] = useState(false);
  const [isRadiusOpen, setRadiusOpen] = useState(false);

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
      />
      <div
        className={`self-center h-8 py-2 border-r ${
          isShowCareVerticalLine
            ? "border-slate-200 dark:border-slate-700 "
            : "border-transparent"
        }`}
      ></div>
      <LocationInput className="flex-1" />
      <div
        className={`self-center h-8 py-2 border-r ${
          isShowLocationVerticalLine
            ? "border-slate-200 dark:border-slate-700"
            : "border-transparent"
        }`}
      ></div>
      <RadiusInput className="flex-1" mobileClassName="" />
    </div>
  );
};

export default StaySearchForm;
