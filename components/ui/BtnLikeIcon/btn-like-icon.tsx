import React, { FC, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon } from "@hugeicons-pro/core-stroke-rounded/index";
export interface BtnLikeIconProps {
  iconSize?: string;
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  onClick?: () => void;
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  iconSize = "size-4",
  className = "",
  colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
  isLiked = false,
  onClick = () => {}
}) => {
  const [likedState, setLikedState] = useState(isLiked);

  return (
    <div
      className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${colorClass} ${className}`}
      data-nc-id="BtnLikeIcon"
      // title={isLiked ? "Remove" : "Save"}
      onClick={onClick}
    >
      <HugeiconsIcon
        icon={FavouriteIcon}
        className={`${iconSize} ${likedState ? "currentColor" : "none"}`}
        fill="currentColor"
        aria-hidden="true"
      />
    </div>
  );
};

export default BtnLikeIcon;
