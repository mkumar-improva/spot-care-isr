import React, { ChangeEvent, FocusEvent, forwardRef } from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label: string;
  value: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  placeHolder?: string;
  type?: React.HTMLInputTypeAttribute;
  inputFontSize?: React.HTMLAttributes<HTMLInputElement>["className"];
  inputPadding?: React.HTMLAttributes<HTMLInputElement>["className"];
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  name = "",
  label,
  value,
  className,
  onChange,
  onBlur,
  error,
  placeHolder,
  type = "text",
  inputFontSize = "text-base",
  inputPadding = "px-4 py-3",
  ...otherProps
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="text-sm font-medium">{label}</label>
      <input
        ref={ref}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeHolder || label}
        onBlur={onBlur}
        className={`w-full ${inputPadding} border rounded-md focus:ring-1 ${inputFontSize} ${
          otherProps.disabled
            ? "bg-gray-100 text-gray-500 cursor-not-allowed focus:ring-0 shadow-none border-neutral-300"
            : error && error !== "" && error !== " "
            ? "border-red-500"
            : "border-neutral-300 focus:border-primary-300"
        }`}
        {...otherProps}
      />
      <div className="transition-all duration-300 ease-in-out">
        <p className={`text-sm text-red-500 ml-[1px] font-normal transition-all duration-300 ease-in-out mt-0 ${
          error && error !== "" && error !== " "
            ? "opacity-100 mb-1 max-h-2" 
            : "opacity-0 max-h-0"
        }`}>
          {error || "\u00A0"}
        </p>
      </div>
    </div>
  );
});

TextField.displayName = "TextField";

export default TextField;
