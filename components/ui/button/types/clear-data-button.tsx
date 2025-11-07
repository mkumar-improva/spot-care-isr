'use client'

import {Cancel01Icon } from  "@hugeicons-pro/core-stroke-rounded/index";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { FC } from "react";

export interface ClearDataButtonProps {
  onClick: () => void;
  position?: string;
}

const ClearDataButton: FC<ClearDataButtonProps> = ({ onClick, position }) => {
  const defaultPosition = "top-1/2 right-3 md:right-1 lg:right-3 md:top-1/2 transform -translate-y-1/2";
  
  return (
    <span
      onClick={() => onClick && onClick()}
      className={`absolute z-10 w-5 h-5 lg:w-6 lg:h-6 text-sm bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center ${position || defaultPosition}`}
    >
        <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
    </span>
  );
};

export default ClearDataButton;
