"use client";
import React from "react";
import useAdvanceSearch from "@/hooks/list/use-advance-search";
import { TitleCase } from "@/utils/converter";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import ButtonClose from "@/components/ui/button/types/button-close";

const AdvanceSearch = () => {
  const {
    containerRef,
    inputRef,
    isSearchFocused,
    searchText,
    setIsSearchFocused,
    setSearchText,
    handleOnChange,
    handleClearSearch,
  } = useAdvanceSearch();

  return (
    <div
      className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
        isSearchFocused ? "w-full md:w-[20rem] lg:w-[20rem]" : "w-[2.5rem] pr-2"
      }`}
    >
      <div className="transition-all duration-300 ease-in-out w-full">
        <div
          ref={containerRef}
          className={`relative flex items-center justify-between overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchFocused
              ? "border border-neutral-300 rounded-xl pl-3 pr-1 py-1"
              : " py-1 rounded-xl"
          }`}
        >
          <input
            ref={inputRef}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => {
              if (!searchText) {
                setIsSearchFocused(false);
              }
            }}
            onChange={handleOnChange}
            className={`transition-all duration-300 ease-in-out font-normal text-sm md:text-base py-0 text-ellipsis 
              border-none outline-none focus:outline-none focus:border-none focus:ring-0 
              ${isSearchFocused ? "w-full max-w-[16rem] px-1" : "w-0 px-0 opacity-0"}`}
            placeholder=""
            value={TitleCase(searchText)}
          />
          <div
            className="text-gray-400 hover:text-primary-500 rounded-full cursor-pointer transition-all duration-300 p-1.5"
            onClick={() => {
              setIsSearchFocused(true);
              inputRef.current?.focus();
            }}
          >
            <HugeiconsIcon
              icon={Search02Icon}
              className={`text-neutral-400 transition-all duration-300 ${
                isSearchFocused
                  ? "size-5 scale-100"
                  : "size-5 scale-125 md:scale-150"
              }`}
              aria-hidden="true"
            />
          </div>
          {searchText && (
            <ButtonClose
              onClick={handleClearSearch}
              className={`absolute right-7 ${!isSearchFocused ? "hidden" : ""}`}
              sizes="size-4"
              isHover={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvanceSearch;
