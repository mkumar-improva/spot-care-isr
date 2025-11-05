"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon } from "@hugeicons-pro/core-stroke-rounded/index";
import React, { FC } from "react";
import useWishlist from "@/hooks/wishlist/use-wishlist";
import Tooltip from "@/components/ui/tool-tip/tool-tip";
import RenderSavedProviderContent from "./render-saved-provider-content";

export interface SavedProviderProps {
  className?: string;
}

const SavedProvider: FC<SavedProviderProps> = ({ className }) => {
  //hooks

  const {
    savedProviderList,
    isTouchDevice,
    isDrawerOpen,
    setIsDrawerOpen,
    handleCloseDrawer,
  } = useWishlist();

  return (
    <>
      {savedProviderList && savedProviderList.length > 0 && (
        <Tooltip text={"Wishlist"} position={"left-[0px] bottom-[-40px]"}>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`flex items-center justify-center gap-[.5rem] md:bg-neutral-50 ${
              !isTouchDevice ? "md:hover:bg-neutral-100" : ""
            }  md:ring-1 md:ring-neutral-200 md:px-[1rem] md:py-[.4rem] md:rounded-full`}
          >
            <span
              className={`text-3xl relative rounded-full text-neutral-700 dark:text-neutral-300  flex items-center justify-center ${className} ${
                savedProviderList &&
                savedProviderList?.length === 0 &&
                "pointer-events-none"
              }`}
            >
              <HugeiconsIcon
                icon={FavouriteIcon}
                className={`size-7 md:size-5 ${
                  savedProviderList && savedProviderList.length > 0
                    ? "text-red-500  cursor-pointer"
                    : "text-white dark:text-slate-900"
                }`}
                aria-hidden="true"
                color="currentColor"
                fill="currentColor"
              />
            </span>{" "}
            <span className="hidden md:block text-base font-semibold tracking-[1px]">
              Wishlist
            </span>
          </button>
        </Tooltip>
      )}
      <RenderSavedProviderContent
        isDrawerOpen={isDrawerOpen}
        handleCloseDrawer={handleCloseDrawer}
      />
    </>
  );
};

export default SavedProvider;
