"use client";

import { ChangeEvent, FC } from "react";
import useProviderInputType from "@/hooks/search/use-provider-input-type";
import { HugeiconsIcon } from "@hugeicons/react";
import { Hospital02Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import SearchButton from "@/components/ui/button/types/search-button";
import ClearDataButton from "@/components/ui/button/types/clear-data-button";
import useSearchUiStore from "store/ui/search-ui-store";

interface ProviderTypeInputProps {
  setShowVerticalLine?: React.Dispatch<React.SetStateAction<boolean>>;
  onFocusScroll?: () => void;
  mobileClassName?: string;
  setShowPopOver?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProviderTypeInput: FC<ProviderTypeInputProps> = ({
  setShowVerticalLine,
  onFocusScroll = () => {},
  mobileClassName = "",
  setShowPopOver,
}) => {
  const { locationValue, searchProviderName, setSearchProviderName } =
    useSearchUiStore((state) => ({
      locationValue: state.locationValue,
      searchProviderName: state.searchProviderName,
      setSearchProviderName: state.setSearchProviderName,
    }));

  //hook
  const {
    isHomePage,
    onFocus,
    inputRef,
    placeHolder,
    desc,
    storePostalCode,
    setOnFocus,
    handleSpanClick,
    handleProviderNameChange,
    handleClearData,
  } = useProviderInputType();

  return (
    <div
      onClick={() => {
        inputRef.current?.focus();
      }}
      className={`w-full relative flex items-center ${
        isHomePage ? "md:pr-2" : ""
      } lg:pr-3 flex-1 ${onFocus ? "nc-hero-field-focused" : ""}`}
    >
      <div
        className={`flex z-10 flex-1 relative pl-[1.3rem] pr-0 lg:px-[1.75rem] 
                flex-shrink-0 items-center space-x-2 md:space-x-3 cursor-pointer focus:outline-none 
                text-left xl:px-10 ${mobileClassName} `}
      >
        <div className="text-neutral-300">
          <HugeiconsIcon
            icon={Hospital02Icon}
            className="size-6 lg:size-7 text-neutral-300"
          />
        </div>
        <div className="flex-grow pl-0">
          <input
            ref={inputRef}
            name="providerVal"
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 
            text-base font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
            placeholder={placeHolder}
            value={searchProviderName}
            disabled={!storePostalCode}
            onChange={handleProviderNameChange}
            onFocus={() => {
              setOnFocus(true);
              setShowVerticalLine?.(false);
              setShowPopOver?.(true);
            }}
            onBlur={() => {
              setOnFocus(false);
              setShowVerticalLine?.(true);
              //setShowPopOver?.(false)
            }}
          />
          <span
            onClick={handleSpanClick}
            className="block mt-0.5 text-sm text-neutral-400 font-light line-clamp-1"
          >
            {!!searchProviderName ? placeHolder : desc}
          </span>
          {searchProviderName && <ClearDataButton onClick={handleClearData} />}
        </div>
      </div>
      <SearchButton
        className={`hidden md:flex items-center justify-center bg-primary-700
            text-white rounded-full overflow-hidden`}
        size="size-12 size-[4.25rem]"
        onClick={() => {}}
      />
    </div>
  );
};

export default ProviderTypeInput;
