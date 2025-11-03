"use client";
import { Popover } from "@headlessui/react";
import useRenderRatingFilter from "@/hooks/list/use-render-rating-filter";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons-pro/core-stroke-standard/index";
import ButtonClose from "@/components/ui/button/types/button-close";

const RenderRatingFilterMobile = () => {
  //hooks
  const {
    cmsRatingFilterVal,
    rangeRatings,
    setIsCmsRatingsDialogOpen,
    resetRatingFilter,
  } = useRenderRatingFilter();
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            onClick={() => setIsCmsRatingsDialogOpen(true)}
            className={`w-[10rem] flex-1 min-w-0 flex items-center justify-between ml-0 px-3 py-3 text-sm rounded-xl 
                border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 
                focus:outline-none ${open ? "!border-primary-500 " : ""}`}
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
        </>
      )}
    </Popover>
  );
};

export default RenderRatingFilterMobile;
