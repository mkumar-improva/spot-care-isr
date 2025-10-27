import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons-pro/core-stroke-sharp/index";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  starSize?: string;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  starSize = "size-[.8rem]",
  className = "flex items-center gap-1",
}) => {
  const renderStar = (index: number) => {
    const starValue = index + 1;
    const decimal = rating - Math.floor(rating);

    if (rating >= starValue) {
      // Fully filled star
      return (
        <HugeiconsIcon
          key={index}
          icon={StarIcon}
          className={`${starSize} text-[#f49d0a] transition-colors duration-200`}
          fill="currentColor"
        />
      );
    } else if (rating >= starValue - 1 && decimal >= 0.1 && decimal <= 0.9) {
      // Half-filled star
      return (
        <div key={index} className="relative inline-block">
          {/* Background empty star */}
          <HugeiconsIcon
            icon={StarIcon}
            className={`${starSize} text-neutral-400 transition-colors duration-200`}
            fill="currentColor"
          />
          {/* Foreground half-filled star */}
          <div
            className="absolute top-0 left-0 overflow-hidden transition-all duration-200"
            style={{ width: `${0.5 * 100}%` }}
          >
            <HugeiconsIcon
              icon={StarIcon}
              className={`${starSize} text-[#f49d0a]`}
              fill="currentColor"
            />
          </div>
        </div>
      );
    } else {
      // Empty star
      return (
        <HugeiconsIcon
          key={index}
          icon={StarIcon}
          className={`${starSize} text-neutral-400 transition-colors duration-200`}
          fill="currentColor"
        />
      );
    }
  };

  return (
    <div className={className}>
      {Array.from({ length: maxRating }).map((_, index) => renderStar(index))}
    </div>
  );
};

export default StarRating;
