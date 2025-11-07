import React, { ChangeEvent, FocusEvent, useEffect } from "react";
import Select from "@/components/ui/Select/Select";

interface SelectFieldProps {
  label: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
  options: string[];
  className?: string;
  optionLabelMap?: Record<string, string>;
  error?: string;
  isError?: boolean;
  defaultOption?: string;
  autoSelectFirst?: boolean; // New prop to control auto-selection
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  name,
  onChange,
  onBlur,
  options,
  className,
  optionLabelMap,
  error,
  isError,
  defaultOption,
  autoSelectFirst = false, // Default to false for backward compatibility
}) => {
  // Auto-select first option if enabled and options are available
  useEffect(() => {
    if (autoSelectFirst && options.length > 0 && !value) {
      const firstOption = options[0];
      const syntheticEvent = {
        target: { value: firstOption, name }
      } as ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
  }, [autoSelectFirst, options, value, onChange, name]);

  const shouldShowDefaultOption = !autoSelectFirst || options.length === 0;
  return (
    <div className={`w-full ${className}`}>
      <label className="text-sm font-medium">{label}</label>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        isShadowRequired
        sizeClass="h-11"
        className={`border rounded px-4 py-3 text-base  ${
          error || isError
            ? "border-red-500 focus:ring-red-500"
            : "border-neutral-200 focus:ring-primary-500"
        }`}
        onBlur={onBlur}
      >
        {shouldShowDefaultOption && (
          <option value="">{defaultOption || label}</option>
        )}
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {optionLabelMap ? optionLabelMap[opt] : opt}
          </option>
        ))}
      </Select>
      <div className="transition-all duration-300 ease-in-out">
        <p
          className={`text-sm text-red-500 ml-[1px] font-normal transition-all duration-300 ease-in-out ${
            error && error !== "" && error !== " "
              ? "opacity-100 -mt-[.15rem] mb-1 max-h-2"
              : "opacity-0 mt-0 max-h-0"
          }`}
        >
          {error || "\u00A0"}
        </p>
      </div>
    </div>
  );
};

export default SelectField;
