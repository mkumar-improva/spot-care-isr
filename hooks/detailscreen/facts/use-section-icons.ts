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

    switch (sectionName) {
      case "General information":
        return createElement(HugeiconsIcon, {
          icon: InformationCircleIcon,
          ...iconProps,
        });
      case "Staff information":
        return createElement(HugeiconsIcon, {
          icon: User02Icon,
          ...iconProps,
        });
      case "Financial information":
        return createElement(HugeiconsIcon, {
          icon: CheckmarkCircle02Icon,
          ...iconProps,
        });
      case "Services offered":
        return createElement(HugeiconsIcon, {
          icon: HealthIcon,
          ...iconProps,
        });
      case "CMS data":
        return createElement(HugeiconsIcon, {
          icon: ThumbsUpIcon,
          ...iconProps,
        });
      case "Features & Amenitites":
        return createElement(HugeiconsIcon, {
          icon: FeatherIcon,
          ...iconProps,
        });
      case "Availability":
        return createElement(HugeiconsIcon, {
          icon: TimeQuarter02Icon,
          ...iconProps,
        });
      case "Pricing & Availability":
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
