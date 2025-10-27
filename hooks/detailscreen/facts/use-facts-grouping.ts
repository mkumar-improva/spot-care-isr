"use client";

import { useState, useEffect } from "react";
import type { Section } from "@/types/provider-details";

export const useFactsGrouping = (facts: Section[]) => {
  const [groupedData, setGroupedData] = useState<Record<string, Section[]>>({});

  useEffect(() => {
    const grouped = facts.reduce((acc, item) => {
      if (!acc[item.careType]) {
        acc[item.careType] = [];
      }
      acc[item.careType].push(item);
      return acc;
    }, {} as Record<string, Section[]>);

    setGroupedData(grouped);
  }, [facts]);

  return {
    groupedData,
  };
};
