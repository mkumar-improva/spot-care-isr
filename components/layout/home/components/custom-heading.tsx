import React from "react";
import { ReactNode } from "react";

export interface Heading2Props {
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
}

const CustomHeading: React.FC<Heading2Props> = ({
  className = "",
  heading = "Providers in New York",
  subHeading = ""
}) => {
  return (
    <div className={`mb-[2rem] ${className}`}>
      <h2 className="text-2xl lg:text-[36px] font-medium leading-[2rem] lg:leading-[2.75rem]">
        {heading}
      </h2>
      {subHeading && (
        <span className="block text-base lg:text-[22px] font-medium text-neutral-500 dark:text-neutral-400 mt-3">
          {subHeading}
        </span>
      )}
    </div>
  );
};

export default CustomHeading;
