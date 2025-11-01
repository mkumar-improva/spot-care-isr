"use client";
import { StarIcon } from "@hugeicons-pro/core-stroke-sharp/index";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { FC } from "react";

interface SliderStarRatingProps {
  className?: string;
  point?: number;
  reviewCount?: number;
  isSelector?: boolean;
}

const SliderStarRating: FC<SliderStarRatingProps> = ({
  className = "",
  point = 4.5,
  reviewCount = 112,
  isSelector = true,
}) => {
  return (
    <div
      className={`flex items-center space-x-1 text-sm  ${className}`}
      data-nc-id="StartRating"
    >
      <div className="flex flex-row items-center justify-start">
        {[...Array(5)].map((_, index) => (
          <HugeiconsIcon
            key={index}
            className={`w-[18px] h-[18px] ${
              index < point ? "text-orange-500" : "text-gray-400"
            }`}
            icon={StarIcon}
            fill="currentColor"
          />
        ))}
      </div>
      {isSelector && (
        <span className="text-neutral-500 dark:text-neutral-400">
          ({point})
        </span>
      )}
    </div>
  );
};

export default SliderStarRating;
