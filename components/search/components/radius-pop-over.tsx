"use client";
import { FC, Fragment, use, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import useHeaderUiStore from "store/ui/header-ui-store";
import useSearchUiStore from "store/ui/search-ui-store";
import useLoadingState from "store/loader/loding-state";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons-pro/core-stroke-standard/index";
import { SolarSystem01Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import ButtonCircle from "@/components/ui/button/types/button-circle";
import RenderRecentSearch from "./render-recent-search";

interface RadiusPopOverProps {
  className?: string;
  mobileClassName?: string;
  placeHolder?: string;
  desc?: string;
  hasButtonSubmit?: boolean;
  onFocusScroll?: () => void;
  SearchOption?: () => void;
}

const RadiusPopOver = ({
  className,
  mobileClassName,
  placeHolder,
  desc,
  hasButtonSubmit = false,
  onFocusScroll,
  SearchOption,
}: RadiusPopOverProps) => {
  /*----------Begining of Store Import----------*/
  const { isHomePage } = useHeaderUiStore();
  const { loading, isWishlistLoaded } = useLoadingState();
  const { setIsShowLocationVerticalLine, setIsShowCareVerticalLine } =
    useSearchUiStore();
  /*----------End of Store Import----------*/

  /*--Begining of refs----------*/
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  const popoverButtonRef = useRef<HTMLButtonElement | null>(null);
  /*----------End of refs----------*/

  /*----------Begining of state ----------*/
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRadiusOpen, setRadiusOpen] = useState(false);
  const [miles, setMiles] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  /*----------End of state ----------*/

  //Handlers
  const handleSelectLocation = (item: string, close: () => void) => {
    setMiles(item);
    close();
    setHighlightedIndex(-1);
  };

  const onClickCapture = () => {
    setIsShowCareVerticalLine(true);
    setIsShowLocationVerticalLine(true);
  };

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
                onClickCapture={onClickCapture}
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
                    value={miles}
                    required
                    onChange={(e) => {
                      setMiles(e.currentTarget.value);
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
                    }}
                  />
                  <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
                    <span className="line-clamp-1">
                      {!!miles ? placeHolder : desc}
                    </span>
                  </span>
                </div>
              </Popover.Button>

              {/* BUTTON SUBMIT OF FORM */}
              {hasButtonSubmit && (
                <div className="lg:pr-3 pr-2">
                  <ButtonCircle
                    className="size-16 flex items-center justify-center bg-primary-700 text-white rounded-full overflow-hidden"
                    onClick={SearchOption}
                    disabled={loading || isWishlistLoaded} // Optional styling for loading state
                  >
                    {loading || isWishlistLoaded ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="animate-spin lg:h-6 lg:w-6 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                    ) : (
                      <HugeiconsIcon
                        icon={Search02Icon}
                        className="md:size-[1.3rem] lg:size-[1.9rem] xl:size-[2rem]"
                      />
                    )}
                  </ButtonCircle>
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
