"use client";

import { FC, useEffect, useState } from "react";
import StaySearchForm from "./stay-search-form";
import ProviderSearchForm from "./provider-search-form";
import useSearchUiStore from "store/ui/search-ui-store";
import useHeaderUiStore from "store/ui/header-ui-store";

interface AnimatedFormProps {
  activeTab: "services" | "provider";
}

type TabType = "services" | "provider";
type Breakpoint = "md" | "lg" | "xl" | "2xl";

const defaultWidthMap: Record<TabType, Record<Breakpoint, string>> = {
  services: {
    md: "48rem",
    lg: "52rem",
    xl: "72rem",
    "2xl": "72rem",
  },
  provider: {
    md: "40rem",
    lg: "50rem",
    xl: "60rem",
    "2xl": "60rem",
  },
};

const nonHomeWidthMap: Record<TabType, Record<Breakpoint, string>> = {
  services: {
    md: "48rem",
    lg: "52rem",
    xl: "59rem",
    "2xl": "62.75rem",
  },
  provider: {
    md: "40rem",
    lg: "50rem",
    xl: "60rem",
    "2xl": "60rem",
  },
};

const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === "undefined") return "xl"; // Default for SSR
  if (window.matchMedia("(min-width: 1536px)").matches) return "2xl";
  if (window.matchMedia("(min-width: 1280px)").matches) return "xl";
  if (window.matchMedia("(min-width: 1024px)").matches) return "lg";
  return "md";
};

const AnimatedForm: FC<AnimatedFormProps> = ({ activeTab = "services" }) => {
  /*----------Begining of Store Import----------*/
  const { searchActiveTab } = useSearchUiStore();
  const { isHomePage } = useHeaderUiStore();
  /*----------End of Store Import----------*/

  /*----------Begining of States----------*/
  const [width, setWidth] = useState<string>(() => {
    // Use a safe default for SSR, will be updated in useEffect
    return defaultWidthMap[searchActiveTab]["xl"];
  });
  /*----------End of States----------*/

  useEffect(() => {
    const updateWidth = () => {
      const breakpoint = getCurrentBreakpoint();
      const mapToUse = isHomePage ? defaultWidthMap : nonHomeWidthMap;
      setWidth(mapToUse[searchActiveTab][breakpoint]);
    };

    updateWidth(); // run immediately
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [searchActiveTab, isHomePage]);

  return (
    <div
      style={{ width }}
      className="transition-all duration-300 ease-in-out overflow-visible"
    >
      {searchActiveTab === "services" ? (
        <StaySearchForm />
      ) : (
        <ProviderSearchForm />
      )}
    </div>
  );
};


export default AnimatedForm;