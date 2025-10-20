"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons-pro/core-stroke-standard/index";
import useSearchUiStore from "store/ui/search-ui-store";

const SearchTab = () => {
  //store selectors
  const { setShowHeroMobileSearch } = useSearchUiStore();

  //handlers
  const heroSearchFormMobile = () => {
    setShowHeroMobileSearch(true);
  };

  return (
    <button
      onClick={heroSearchFormMobile}
      className="text-2xl md:text-3xl rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center"
    >
      <HugeiconsIcon icon={Search02Icon} size={28} aria-hidden="true" />
    </button>
  );
};

export default SearchTab;
