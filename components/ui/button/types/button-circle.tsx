import React, { ButtonHTMLAttributes } from "react";
import twFocusClass from "@/utils/twFocusClass";

export interface ButtonCircleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
}

const ButtonCircle: React.FC<ButtonCircleProps> = ({
  className = "bg-primary-700 items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 hover:bg-primary-700 text-neutral-50",
  size = "size-9",
  ...args
}) => {
  return (
    <button className={`${className}${size}${twFocusClass(true)}`} {...args} />
  );
};

export default ButtonCircle;
