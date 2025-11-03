"use client";
import { Fragment, FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { SolarSystem01Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import RenderRecentSearch from "./render-recent-search";
import SearchButton from "@/components/ui/button/types/search-button";
import useRadiusPopOver from "@/hooks/search/use-radius-pop-over";

interface RadiusPopOverProps {
  className?: string;
  mobileClassName?: string;
  placeHolder?: string;
  desc?: string;
  hasButtonSubmit?: boolean;
  onFocusScroll?: () => void;
  setCareSearchShowVerticalLine?: React.Dispatch<React.SetStateAction<boolean>>;
  setRadiusSearchShowVerticalLine?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const RadiusPopOver: FC<RadiusPopOverProps> = ({
  className,
  mobileClassName,
  placeHolder,
  desc,
  hasButtonSubmit = false,
  onFocusScroll,
  setCareSearchShowVerticalLine,
  setRadiusSearchShowVerticalLine,
}) => {
  const {
    isHomePage,
    loading,
    isWishlistLoaded,
    radiusValue,
    highlightedIndex,
    containerRef,
    optionRefs,
    popoverButtonRef,
    careTypeValue,
    locationValue,
    storePostalCode,
    setIsDropdownOpen,
    setRadiusOpen,
    setRadiusValue,
    setHighlightedIndex,
    handleSelectLocation,
    onClickCapture,
    SearchOption,
  } = useRadiusPopOver({
    setCareSearchShowVerticalLine,
    setRadiusSearchShowVerticalLine,
  });

  return (
    <Popover className={`flex relative ${className} lg:px-0`}>
      {({ open, close }) => {
        return (
          <>
            <div
              className={`flex-1 z-10 ${
                isHomePage ? "lg:py-2" : "xl:py-2"
              }   flex items-center focus:outline-none ${
                open ? "nc-hero-field-focused" : ""
              } ${mobileClassName}`}
            >
              <Popover.Button
                ref={popoverButtonRef}
                className={`relative z-10 flex-1 flex text-left items-center pl-[1rem] pr-[1rem] py-[.75rem] lg:px-[1.75rem] space-x-3 focus:outline-none`}
                onClickCapture={() => {
                  onClickCapture();
                  onFocusScroll?.();
                }}
              >
                {" "}
                <div className="text-neutral-300 dark:text-neutral-400">
                  <HugeiconsIcon
                    icon={SolarSystem01Icon}
                    className="size-6 lg:size-7 xl:size-8 rotate-180 -scale-x-100"
                  />
                </div>
                <div className="flex-grow">
                  <input
                    className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 text-base font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                    placeholder={placeHolder}
                    value={radiusValue}
                    required
                    onChange={(e) => {
                      setRadiusValue(e.currentTarget.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !open) {
                        e.preventDefault();
                        if (SearchOption) {
                          SearchOption();
                        }

                        close();
                        setIsDropdownOpen(false);
                        setRadiusOpen(false);
                        setHighlightedIndex(-1);
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur();
                        }
                      }
                    }}
                    onFocus={() => {
                      if (!open && popoverButtonRef.current) {
                        popoverButtonRef.current.click();
                      }
                      onFocusScroll?.();
                    }}
                  />
                  <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
                    <span className="line-clamp-1">
                      {!!radiusValue ? placeHolder : desc}
                    </span>
                  </span>
                </div>
              </Popover.Button>

              {/* BUTTON SUBMIT OF FORM */}
              {hasButtonSubmit && (
                <div className="hidden md:block pr-2 lg:pr-3">
                  <SearchButton
                    className={`flex items-center justify-center bg-primary-700 
                  text-white rounded-full overflow-hidden 
                   ${
                     loading ||
                     isWishlistLoaded ||
                     !careTypeValue ||
                     !locationValue ||
                     !storePostalCode ||
                     !radiusValue
                       ? "cursor-not-allowed"
                       : "cursor-pointer"
                   }`}
                    size="size-12 lg:size-16"
                    onClick={SearchOption ?? (() => {})}
                    disabled={
                      loading ||
                      isWishlistLoaded ||
                      !careTypeValue ||
                      !locationValue ||
                      !storePostalCode ||
                      !radiusValue
                    }
                    loading={loading || isWishlistLoaded}
                  />
                </div>
              )}
            </div>

            {/*  Popover pannel*/}
            {open && (
              <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-1 lg:bg-white dark:lg:bg-neutral-800"></div>
            )}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
              afterLeave={() => setHighlightedIndex(-1)}
            >
              <Popover.Panel
                className={`absolute top-[-8rem] left-1/2 transform -translate-x-1/2 z-10 w-full h-fit bg-white
              rounded-xl overflow-hidden shadow-lg ${
                isHomePage ? "md:top-[4rem] lg:top-[6rem]" : "xl:top-[6rem]"
              }`}
              >
                <div
                  ref={containerRef}
                  className="h-full overflow-auto"
                  tabIndex={-1}
                >
                  <RenderRecentSearch
                    onClick={handleSelectLocation}
                    optionRefs={optionRefs}
                    highlightedIndex={highlightedIndex}
                    onClose={close}
                  />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );
};

export default RadiusPopOver;
