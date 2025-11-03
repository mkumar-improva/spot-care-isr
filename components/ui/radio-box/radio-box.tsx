import React, { FC } from "react";

export interface RadioboxProps {
  label?: string;
  subLabel?: string;
  className?: string;
  name: string;
  value: string;
  onChange?: (value: string) => void;
  checked: boolean;
  radioHeight?: string;
  radioWidth?: string;
}

const Radiobox: FC<RadioboxProps> = ({
  subLabel = "",
  label = "",
  name,
  value,
  className = "",
  radioHeight = "h-4",
  radioWidth = "w-4",
  onChange,
  checked,
}) => {
  return (
    <div
      className={`flex text-sm sm:text-base ${className}`}
      onClick={() => onChange && onChange(value)}
    >
      <input
        id={`${name}-${value}`}
        name={name}
        value={value}
        className={`focus:ring-action-primary ${radioHeight} ${radioWidth} text-primary-600
             border-primary rounded-full mt-1 border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500`}
        type="radio"
        checked={checked}
        onChange={() => onChange && onChange(value)}
      />
      {label && (
        <label
          htmlFor={`${name}-${value}`}
          className="ml-3 flex flex-col flex-1 justify-center"
        >
          <p className="text-base text-neutral-900 dark:text-neutral-100">
            {label}
          </p>
          {subLabel && (
            <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm font-light">
              {subLabel}
            </p>
          )}
        </label>
      )}
    </div>
  );
};

export default Radiobox;
