"use client";
import { ButtonHTMLAttributes, FC } from "react";
import ButtonCircle from "./button-circle";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons-pro/core-stroke-standard/index";
import { size } from "app/opengraph-image";

interface SearchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: ButtonHTMLAttributes<HTMLButtonElement>["className"];
  size?: ButtonHTMLAttributes<HTMLButtonElement>["className"];
  disabled?: ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  onClick: () => void;
  loading?: boolean;
}

const SearchButton: FC<SearchButtonProps> = ({
  className = "w-12 h-12 lg:w-16 lg:h-16",
  size = "lg:size-10 size-8",
  disabled = false,
  onClick,
  loading = false,
}) => {
  return (
    <div className="">
      <ButtonCircle className={className} size={size} disabled={disabled} onClick={onClick}>
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin lg:h-6 lg:w-6 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        ) : (
          <HugeiconsIcon
            icon={Search02Icon}
            className="md:size-[1.3rem] lg:size-[1.9rem] xl:size-[2rem]"
          />
        )}
      </ButtonCircle>
    </div>
  );
};

export default SearchButton;
