import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";

export interface ButtonProps {
  className?: ButtonHTMLAttributes<HTMLButtonElement>["className"];
  onclick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const _renderLoading = () => {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

const Button: FC<ButtonProps> = ({
  className,
  onclick,
  loading,
  disabled,
  children,
  type = "button",
}) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 ${className}`}
      onClick={onclick}
      disabled={disabled || loading}
      type={type}
    >
      {loading && _renderLoading()}
      {children}
    </button>
  );
};

export default Button;
