"use client";

import ButtonCircle from "@/components/ui/button/types/button-circle";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons-pro/core-stroke-standard/index";
import useHeaderUiStore from "store/ui/header-ui-store";
import useSearchUiStore from "@/store/ui/search-ui-store";

const RenderButtonOpenHeroSearch = () => {
/*----------Begining of Store Import----------*/
  const { showHeroSearch, setShowHeroSearch } = useHeaderUiStore();
  const { 
    searchActiveTab, 
    careTypeValue, 
    locationValue, 
    radiusValue, 
    searchProviderName 
  } = useSearchUiStore();
/*----------End of Store Import----------*/

/*----------Start of onclick function----------*/
  const handleClick = () => {
    setShowHeroSearch(true);
  };
/*----------End of onclick function----------*/

  return (
    <div
      onClick={handleClick}
      className={`w-fit absolute top-[1.1rem] left-1/2 -translate-x-1/2  flex items-center justify-between border border-neutral-200 dark:border-neutral-6000 
        pr-[.4rem] rounded-full shadow hover:shadow-md transition-all ${showHeroSearch
            ? "-translate-x-0 translate-y-20 scale-x-[2.55] scale-y-[2.0] opacity-0 pointer-events-none invisible"
            : "visible"
        }`}
    >
      <div className="flex items-center font-medium text-sm">
        {/* For Provider Search: Location on LEFT */}
        {searchActiveTab === "provider" && (
          <>
            <span className="block pl-5 pr-4 cursor-pointer py-2 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis xl:max-w-[6rem] 2xl-custom:max-w-[10rem]">
              {locationValue || "Location"}
            </span>
            <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
            <span className="block px-4 cursor-pointer py-2 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis xl:max-w-[6rem] 2xl-custom:max-w-[10rem]">
              {searchProviderName || "Provider name"}
            </span>
          </>
        )}
        
        {/* For Services Search: Care type on LEFT, Location in middle, Distance on RIGHT */}
        {searchActiveTab === "services" && (
          <>
            <span className="block pl-5 pr-4 cursor-pointer py-2 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis xl:max-w-[6rem] 2xl-custom:max-w-[10rem]">
              {careTypeValue || "Type of care"}
            </span>
            <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
            <span className="block px-4 cursor-pointer py-2 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis xl:max-w-[6rem] 2xl-custom:max-w-[10rem]">
              {locationValue || "Location"}
            </span>
            <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
            <span className="block px-4 cursor-pointer py-2 md:py-3 overflow-hidden whitespace-nowrap text-ellipsis">
              {radiusValue || "Distance"}
            </span>
          </>
        )}
      </div>
      <ButtonCircle className="size-8 flex items-center justify-center bg-primary-700 text-white rounded-full overflow-hidden">
        <HugeiconsIcon
          icon={Search02Icon}
          className="size-[1rem] text-white"
          strokeWidth={2}
        />
      </ButtonCircle>
    </div>
  );
};

export default RenderButtonOpenHeroSearch;
