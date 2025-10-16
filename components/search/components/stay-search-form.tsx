"use client";

import { FC, useRef, useState } from "react";
import CareTypeInput from "./care-type-input";

const StaySearchForm: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isCareTypeOpen, setCareTypeOpen] = useState(false);
  const [isRadiusOpen, setRadiusOpen] = useState(false);

  return (
    <div
      ref={containerRef}
      className={`mx-auto relative  flex rounded-full  bg-white dark:bg-neutral-800 border 
        border-neutral-200 dark:border-neutral-6000`}
    >
      <CareTypeInput
        className="flex-1"
        mobileClassName=""
        setRadiusOpen={setRadiusOpen}
        isRadiusOpen={isRadiusOpen}
        setCareTypeOpen={setCareTypeOpen}
        isCareTypeOpen={isCareTypeOpen}
      />
    </div>
  );
};


export default StaySearchForm;