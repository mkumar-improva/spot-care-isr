"use client";

import { useState, useEffect } from "react";
import { Providers } from "@/types/provider-details";

export const useProviderOverview = (selectedProviderDetail: Providers | null) => {
  const [overView, setOverView] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedProviderDetail || overView.length > 0) return;

    selectedProviderDetail.sections?.forEach((section) => {
      section.subSections?.forEach((subSection) => {
        subSection.questions?.forEach((question) => {
          if (question.questionText?.includes("overview")) {
            const responseText = question.responses?.[0]?.responseText;
            setOverView([responseText]);
          }
        });
      });
    });
  }, [selectedProviderDetail, overView.length]);

  return {
    overView,
  };
};
