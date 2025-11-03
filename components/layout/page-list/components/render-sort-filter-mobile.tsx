"use client";
import { Popover } from "@headlessui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons-pro/core-stroke-standard/index";
import ButtonClose from "@/components/ui/button/types/button-close";
import useSortFilter from "@/hooks/list/use-sort-filter";

const RenderSortFilterMobile = () => {
  const { sortFilterVal, setIsSortingDialogOpen, sortByOptions, resetSortFilter } =
    useSortFilter();
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            onClick={() => setIsSortingDialogOpen(true)}
            className={`w-[11.75rem] flex items-center justify-between px-4 py-3 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 
                hover:border-neutral-400 dark:hover:border-neutral-500 focus:outline-none ${
                  open ? "!border-primary-500 " : ""
                }`}
          >
            <span className="text-sm font-medium">Sort ({sortFilterVal})</span>
            {sortFilterVal !== "Recommended" ? (
              <div>
                <ButtonClose
                  sizes="!size-3"
                  className="!size-3"
                  isHover={false}
                  onClick={(e) =>{
                    e?.stopPropagation();
                    resetSortFilter();
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

export default RenderSortFilterMobile;
