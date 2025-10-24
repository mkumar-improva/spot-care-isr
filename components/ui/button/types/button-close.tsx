"use client";

import React from "react";
import { Cancel01Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import { HugeiconsIcon } from "@hugeicons/react";

import twFocusClass from "utils/twFocusClass";

export interface ButtonCloseProps {
  className?: string;
  onClick?: () => void;
  sizes?: string;
  isHover?: boolean;
  disabled?: boolean;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
  className = "",
  onClick = () => {},
  sizes = "w-5 h-5",
  isHover = true,
  disabled = false,
}) => {
  return (
    <button
      className={
        `w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 ${
          isHover ? "hover:bg-neutral-100 dark:hover:bg-neutral-700" : ""
        } ${className} ` + twFocusClass()
      }
      onClick={onClick}
      disabled={disabled}
    >
      <span className="sr-only">Close</span>
      <HugeiconsIcon icon={Cancel01Icon} className={`${sizes}`} />
    </button>
  );
};

export default ButtonClose;
