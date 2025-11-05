"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  ThumbsUpIcon,
  User02Icon,
  TimeQuarter02Icon,
  SaveMoneyDollarIcon,
  HealthIcon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import { FeatherIcon } from "@hugeicons-pro/core-stroke-sharp/index";
import { ReactNode, createElement } from "react";

export const useSectionIcons = () => {
  const getSectionIcon = (sectionName: string): ReactNode => {
    const iconProps = {
      className: "h-4 w-4 flex-shrink-0 mt-1",
      strokeWidth: 2,
    };

    switch (sectionName.toLowerCase()) {
      case "general information":
        return createElement(HugeiconsIcon, {
          icon: InformationCircleIcon,
          ...iconProps,
        });
      case "staff information":
        return createElement(HugeiconsIcon, {
          icon: User02Icon,
          ...iconProps,
        });
      case "financial information":
        return createElement(HugeiconsIcon, {
          icon: CheckmarkCircle02Icon,
          ...iconProps,
        });
      case "services offered":
        return createElement(HugeiconsIcon, {
          icon: HealthIcon,
          ...iconProps,
        });
      case "cms data":
        return createElement(HugeiconsIcon, {
          icon: ThumbsUpIcon,
          ...iconProps,
        });
      case "features & amenities":
        return createElement(HugeiconsIcon, {
          icon: FeatherIcon,
          ...iconProps,
        });
      case "availability":
        return createElement(HugeiconsIcon, {
          icon: TimeQuarter02Icon,
          ...iconProps,
        });
      case "pricing & availability":
        return createElement(HugeiconsIcon, {
          icon: SaveMoneyDollarIcon,
          ...iconProps,
        });
      default:
        return createElement("span", {
          className: "p-[3px] rounded-full bg-neutral-500 mt-[9px]",
        });
    }
  };

  return {
    getSectionIcon,
  };
};
