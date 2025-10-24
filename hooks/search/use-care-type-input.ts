"use client";
import React, { useState, useRef, useMemo } from "react";
import useSearchDataStore from "store/data/search-data-store";
import { useOutsideAlerter } from "../common/use-outsider-click";
import { useDebounce } from "../common/use-debounce";
import useSearchUiStore from "store/ui/search-ui-store";

const useCareTypeInput = () => {
  /*----------Begining of Store Import----------*/
  const { careTypes } = useSearchDataStore();
  const { careTypeValue, setCareTypeValue } = useSearchUiStore();
  /*----------End of Store Import----------*/

  //state
  const [careTypeOpen, setCareTypeOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  /*----------Begining of Refs----------*/
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  /*----------End of Refs----------*/

  //debounced value
  const debouncedValue = useDebounce(careTypeValue, 300);

  //filtered care types
  const filteredCareTypes = useMemo(() => {
    if (!debouncedValue.trim()) return careTypes;
    return careTypes
      .map((group) => {
        const filteredItems = group.careTypes.filter((care) =>
          care.toLowerCase().includes(debouncedValue.toLowerCase())
        );
        return filteredItems.length > 0
          ? { ...group, careTypes: filteredItems }
          : null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [careTypes, debouncedValue]);

  //handlers
  useOutsideAlerter(containerRef, () => {
    setCareTypeOpen(false);
  });

  return {
    careTypes,
    careTypeOpen,
    careTypeValue,
    highlightedIndex,
    filteredCareTypes,

    containerRef,
    inputRef,
    listRef,

    setCareTypeValue,
    setCareTypeOpen,
  };
};

export default useCareTypeInput;
