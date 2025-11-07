"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import usePageListUIStore from "@/store/ui/page-list-ui-store";
import { useSearchParams, usePathname } from "next/navigation";
import FunctionDebounce from "@/utils/functional-debounce";

const useAdvanceSearch = () => {
  //hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();

  //refs
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  //store
  const { isSearchFocused, setIsSearchFocused } = usePageListUIStore();

  //state
  const [searchText, setSearchText] = useState<string>("");

  //useeffects
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialVal = params.get("searchFilter") || "";

    // streamline UX: title-case only on display, not on raw state
    if (initialVal && initialVal.trim() !== "") {
      setSearchText(initialVal);
      setIsSearchFocused(true);
      inputRef.current?.focus();
    }
  }, []);

  //handlers
  const debouncedSearch = FunctionDebounce((text: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("searchFilter", text);
    const newUrl = `${pathname}?${newParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, 400);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("searchFilter");
    const newUrl = `${pathname}?${newParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
    setIsSearchFocused(false);
    inputRef.current?.blur();
  };

  return {
    containerRef,
    inputRef,
    isSearchFocused,
    searchText,
    setIsSearchFocused,
    setSearchText,
    handleOnChange,
    handleClearSearch,
  };
};

export default useAdvanceSearch;
