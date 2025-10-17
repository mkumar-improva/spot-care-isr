'use client'

import { SocialType } from "@/components/ui/social-share/social-share";
import React, { FC } from "react";
import {
  Facebook02Icon,
  Linkedin02Icon,
  NewTwitterIcon
} from "@hugeicons-pro/core-stroke-standard/index";
import { InstagramIcon } from "@hugeicons-pro/core-stroke-rounded/index";
import { HugeiconsIcon } from "@hugeicons/react";

interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  { name: "Linkedin", icon: Linkedin02Icon, href: "#" },
  { name: "Facebook", icon: Facebook02Icon, href: "#" },
  { name: "Instagram", icon: InstagramIcon, href: "#" },
  { name: "Twitter", icon: NewTwitterIcon, href: "#" }
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = socialsDemo
}) => {
  return (
    <nav
      className={`nc-SocialsList flex gap-[1.5rem] items-center text-2xl pb-1 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <button
          key={i}
          className={`flex items-center justify-center ${itemClass}`}
          rel="noopener noreferrer"
          title={item.name}
        >
          <HugeiconsIcon
            icon={item.icon}
            className="text-base text-center text-neutral-700 lg:text-neutral-500 lg:hover:text-primary-500"
            aria-hidden="true"
            size={22}
            strokeWidth={1.8}
          />
        </button>
      ))}
    </nav>
  );
};

export default SocialsList;
