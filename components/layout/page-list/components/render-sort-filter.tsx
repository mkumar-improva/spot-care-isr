"use client";
import { Popover, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons-pro/core-stroke-standard/index";
import useSortFilter from "@/hooks/list/use-sort-filter";
import Radiobox from "@/components/ui/radio-box/radio-box";
import ButtonSecondary from "@/components/ui/button/types/button-secondary";
import ButtonClose from "@/components/ui/button/types/button-close";

const RenderSortFilter = () => {
  const { sortFilterVal, filterOptions, sortByOptions, resetSortFilter } =
    useSortFilter();

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
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
                  onClick={(e) => {
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
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-screen md:max-w-sm max-w-xs md:px-4 pl-[1.6rem] mt-3 left-[-9.5rem] sm:left-0 sm:px-0 lg:max-w-md">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div
                  className="relative flex flex-col px-5 py-6 space-y-5 overflow-y-scroll scrollbar-thin-only md:overflow-y-auto 
                    max-h-[calc(100vh-300px)] sm:max-h-[calc(100vh-200px)]"
                >
                  {filterOptions.map(({ key, label, subLabel, checked }) => (
                    <div key={key}>
                      <Radiobox
                        name="filterGroup"
                        value={key}
                        label={label}
                        subLabel={subLabel}
                        checked={checked}
                        onChange={(value) => sortByOptions(value)}
                      />
                    </div>
                  ))}
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

export default RenderSortFilter;
