"use client";
import { Popover, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons-pro/core-stroke-standard/index";
import Slider from "rc-slider";
import useRenderRatingFilter from "@/hooks/list/use-render-rating-filter";
import SliderStarRating from "@/components/ui/StarRating/slider-star-rating";
import ButtonSecondary from "@/components/ui/button/types/button-secondary";
import ButtonClose from "@/components/ui/button/types/button-close";

interface RenderRatingFilterProps {
  //filters: Filters;
}

const RenderRatingFilter: FC<RenderRatingFilterProps> = () => {
  //hooks
  const {
    isDialogOpen,
    cmsRatingFilterVal,
    rangeRatings,
    handleRatingChange,
    resetRatingFilter,
  } = useRenderRatingFilter();

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`w-[10rem] flex items-center justify-between ml-0  px-4 py-3 text-sm rounded-xl border border-neutral-300 
                dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 focus:outline-none ${
                  open ? "!border-primary-500 " : ""
                }`}
          >
            <span className="text-sm  font-semibold truncate min-w-0 mr-2">
              CMS Rating ({cmsRatingFilterVal})
            </span>
            {!(rangeRatings[0] === 0 && rangeRatings[1] === 5) ? (
              <div>
                <ButtonClose
                  sizes="!size-3"
                  className="!size-3"
                  isHover={false}
                  onClick={(e) => {
                    e?.stopPropagation();
                    resetRatingFilter();
                  }}
                />
              </div>
            ) : (
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                className="size-5 absolute right-2 text-neutral-700"
              />
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-screen max-w-xs md:max-w-sm md:px-4 px-0 mt-3 left-0 sm:px-0">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="relative flex flex-col px-5 py-6 space-y-8">
                  <div className="space-y-5">
                    <span className="text-sm font-medium">
                      Select CMS rating range
                    </span>
                    <Slider
                      range
                      className="text-red-400"
                      min={0}
                      max={5}
                      defaultValue={[rangeRatings[0], rangeRatings[1]]}
                      allowCross={false}
                      onChangeComplete={(e) =>
                        handleRatingChange(e as number[])
                      }
                    />
                  </div>
                  <span className="flex justify-evenly text-base">
                    min
                    <SliderStarRating
                      reviewCount={5}
                      point={rangeRatings[0]}
                      isSelector={false}
                    />
                    <span className="ml-2 mr-2 text-base">-</span>
                    max
                    <SliderStarRating
                      reviewCount={5}
                      point={rangeRatings[1]}
                      isSelector={false}
                    />
                  </span>
                </div>
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-end">
                  <ButtonSecondary
                    className="border border-neutral-200 
                   text-neutral-700 rounded-full px-6 py-2 text-base hover:bg-neutral-100 transition-colors duration-200 ease-in-out"
                  >
                    Close
                  </ButtonSecondary>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default RenderRatingFilter;
