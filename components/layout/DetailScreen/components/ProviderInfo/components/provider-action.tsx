"use client";

import { FC } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import BtnLikeIcon from "@/components/ui/BtnLikeIcon/btn-like-icon";
import { useProviderActions } from "@/hooks/detailscreen/providerinfo";

interface ProviderActionProps {
  className: string;
  onSave?: () => void;
  onShare?: () => void;
  onReport?: () => void;
  isSelected?: boolean;
}

const ProviderAction: FC<ProviderActionProps> = ({
  className,
  onSave = () => {},
  onShare = () => {},
  onReport = () => {},
  isSelected = false,
}) => {
  const { isTouchDevice, providerActions } = useProviderActions({ onSave });

  return (
    <div
      className={`${className} justify-start lg:justify-end items-center w-full gap-[2rem]`}
    >
      {providerActions.map((e, i) =>
        e.isSave ? (
          <button
            key={i}
            onClick={e.onclick}
            className="group flex items-center text-neutral-500 text-sm rounded-lg gap-[.1rem] hover:text-neutral-700"
          >
            <BtnLikeIcon
              iconSize="size-5 md:size-5"
              isLiked={isSelected}
              className={` ${
                isSelected
                  ? "text-red-500 dark:text-red-500"
                  : !isTouchDevice
                  ? "text-neutral-500 dark:text-neutral-100 group-hover:text-red-500"
                  : "text-neutral-500 dark:text-neutral-100 group-active:text-red-500"
              }`}
              colorClass={`
              ${
                isSelected
                  ? !isTouchDevice
                    ? "bg-opacity-30 group-hover:bg-opacity-50 dark:bg-opacity-30 dark:group-hover:bg-opacity-50"
                    : "bg-opacity-30 group-active:bg-opacity-50 dark:bg-opacity-30"
                  : !isTouchDevice
                  ? "bg-opacity-30 group-hover:text-red-500 dark:bg-opacity-30 dark:group-hover:text-red-500"
                  : "bg-opacity-30 group-active:bg-opacity-50 dark:bg-opacity-30"
              }`}
            />
            <span
              className={`text-base ${
                isSelected
                  ? "text-red-500 dark:text-red-400"
                  : !isTouchDevice
                  ? "text-neutral-500 dark:text-neutral-300 group-hover:text-red-500"
                  : "text-neutral-500 dark:text-neutral-300 group-active:text-red-500"
              }`}
            >
              Save
            </span>
          </button>
        ) : (
          <button
            key={i}
            className="flex items-center gap-[.5rem] text-neutral-500 text-sm rounded-lg hover:text-neutral-700"
            onClick={e.onclick}
          >
            <HugeiconsIcon
              icon={e.icon}
              className="size-5 md:size-6 "
              color="currentColor"
              strokeWidth={1.2}
            />
            <span className="text-[1rem]">{e.title}</span>
          </button>
        )
      )}
    </div>
  );
};

export default ProviderAction;
