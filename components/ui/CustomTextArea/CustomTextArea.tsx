import React, { ChangeEvent, FocusEvent } from "react";

interface CustomTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  label: string;
  value: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeHolder?: string;
  rows?: number;
  inputFontSize?: React.HTMLAttributes<HTMLTextAreaElement>["className"];
  wordLimit?: number;
  characterLimit?: number;
  resizable?: boolean;
  countposition?: React.HTMLAttributes<HTMLTextAreaElement>["className"]
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  name = "",
  label,
  value,
  className,
  onChange,
  onBlur,
  error,
  placeHolder,
  rows = 4,
  inputFontSize = "text-base",
  wordLimit,
  characterLimit=500,
  resizable = false,
  countposition='bottom-2 left-3',
  ...otherProps
}) => {
  // Count words in the current value
  const countWords = (text: string): number => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  // Count characters in the current value
  const currentCharCount = value.length;
  const currentWordCount = countWords(value);

  const isOverWordLimit = wordLimit ? currentWordCount > wordLimit : false;
  const isOverCharLimit = characterLimit
    ? currentCharCount > characterLimit
    : false;
  const isOverLimit = isOverWordLimit || isOverCharLimit;

  // Handle change with word/character limit validation
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const newWordCount = countWords(newValue);
    const newCharCount = newValue.length;

    // If word limit is set and exceeded, prevent input
    if (wordLimit && newWordCount > wordLimit) {
      return; // Don't update if over word limit
    }

    // If character limit is set and exceeded, prevent input
    if (characterLimit && newCharCount > characterLimit) {
      return; // Don't update if over character limit
    }

    onChange(e);
  };
  return (
    <div className={`w-full ${className}`}>
      <label className="text-sm font-medium">{label}</label>
      <div
        className={`relative px-1 py-1 border rounded-md focus-within:ring-1 focus-within:ring-primary-300  ${
          resizable ? "resize" : "resize-none"
        } ${
          otherProps.disabled 
            ? "bg-neutral-50 cursor-not-allowed" 
            : "bg-white"
        } ${
          error || isOverLimit
            ? "border-red-500 focus-within:border-primary-500"
            : "border-neutral-300 focus-within:border-primary-500"
        }`}
      >
        <textarea
          name={name}
          value={value}
          onChange={wordLimit || characterLimit ? handleChange : onChange}
          placeholder={placeHolder}
          onBlur={onBlur}
          rows={rows}
          className={`w-full ${inputFontSize} rounded-none border-none focus:ring-0 focus:outline-none ${
            resizable ? "resize" : "resize-none"
          } ${
            otherProps.disabled 
              ? "bg-neutral-50 cursor-not-allowed text-neutral-500" 
              : ""
          }`}
          style={{ resize: resizable ? "vertical" : "none" }}
          {...otherProps}
        />
        {/* Character count display */}
        {characterLimit && (
          <div className="text-xs text-neutral-500 mx-3">
            <span
              className={
                currentCharCount > characterLimit ? "text-red-500" : ""
              }
            >
              {currentCharCount}
            </span>
            <span className="text-neutral-400">
              /{characterLimit} characters
            </span>
          </div>
        )}
        {/* Word count display */}
        {wordLimit && !characterLimit && (
          <div className={`absolute ${countposition} text-xs text-neutral-500`}>
            <span
              className={currentWordCount > wordLimit ? "text-red-500" : ""}
            >
              {currentWordCount}
            </span>
            <span className="text-neutral-400">/{wordLimit} words</span>
          </div>
        )}
      </div>
      {/* Error message: collapses to 0 when empty; expands only for this field when present */}
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          error && error !== "" ? "mt-1 mb-2" : "mt-0 mb-0"
        }`}
      >
        <p
          aria-live="polite"
          className={`text-sm text-red-500 ml-[1px] leading-snug transition-all duration-300 ease-in-out ${
            error && error !== ""
              ? "opacity-100 -mt-[.15rem] max-h-2"
              : "opacity-0 max-h-0"
          }`}
        >
          {error && error !== "" ? error : ""}
        </p>
      </div>
    </div>
  );
};

export default CustomTextArea;
