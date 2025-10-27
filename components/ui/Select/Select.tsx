import React, {
  SelectHTMLAttributes,
  ReactNode,
  ForwardedRef,
} from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  sizeClass?: string;
  isShadowRequired?: boolean;
  children: ReactNode;
}
const Select = React.forwardRef(
  (
    {
      className = "",
      sizeClass = "h-11",
      isShadowRequired = true,
      children,
      ...args
    }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <select
        ref={ref} 
        className={`nc-Select ${sizeClass} block w-full text-sm rounded-lg border-neutral-200 focus:border-primary-300 ${
          isShadowRequired
            ? "focus:ring-opacity-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25"
            : "border-2 focus:ring-0"
        } bg-white dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
        {...args}
      >
      
        {children}
      </select>
    );
  }
);

export default Select;
