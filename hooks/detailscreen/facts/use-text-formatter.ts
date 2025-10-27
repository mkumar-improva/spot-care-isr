"use client";

import { useCallback } from "react";

export const useTextFormatter = () => {
  // Convert camelCase to normal case with only first letter capitalized
  const convertToNormalCase = useCallback((text: string) => {
    return text
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Handle consecutive capitals like "CMS" followed by normal word
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters in camelCase
      .replace(
        /([&]\s*)([a-z])/g,
        "$1$2".replace(/([&]\s*)([a-z])/, "$1" + "$2".toUpperCase())
      ) // Capitalize after &
      .trim() // Remove leading/trailing spaces
      .toLowerCase() // Convert all to lowercase
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .replace(/\bcms\b/gi, "CMS") // Keep CMS as uppercase
      .replace(
        /(&\s*)([a-z])/gi,
        "$1$2".replace(/(&\s*)([a-z])/i, "$1" + "$2".toUpperCase())
      ); // Capitalize after &
  }, []);

  return {
    convertToNormalCase,
  };
};
