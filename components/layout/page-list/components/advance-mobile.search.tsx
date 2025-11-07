"use client";
import React from "react";
import useAdvanceSearch from "@/hooks/list/use-advance-search";
import { TitleCase } from "@/utils/converter";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import ButtonClose from "@/components/ui/button/types/button-close";

const AdvanceMobileSearch = () => {
  //hooks
  const { searchText, handleOnChange, handleClearSearch } = useAdvanceSearch();

  return (
    <div className="relative w-full md:w-[20rem]">
      <div className="w-full">
        <div className="w-full overflow-hidden relative flex items-center justify-between gap-1 border border-neutral-300 rounded-xl pl-3 pr-1 py-1">
          <input
            className="w-full max-w-[16rem] text-ellipsis border-transparent focus:outline-transparent focus:border-transparent focus:ring-0 font-normal text-sm md:text-base py-0 px-1"
            placeholder=""
            value={TitleCase(searchText)}
            onChange={handleOnChange}
            autoFocus={true}
          />
          <div className="text-gray-400 hover:text-primary-500 p-1.5 rounded-full cursor-pointer">
            <HugeiconsIcon
              icon={Search02Icon}
              className="size-5 text-neutral-400"
              aria-hidden="true"
            />
          </div>
          {searchText && searchText.trim().length > 0 && (
            <ButtonClose
              onClick={handleClearSearch}
              className={`absolute right-7`}
              sizes="size-4"
              isHover={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvanceMobileSearch;
