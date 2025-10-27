import { HugeiconsIcon } from "@hugeicons/react";
import { createElement, ReactElement } from "react";
import {
  AiWebBrowsingIcon,
  Facebook02Icon,
  InstagramIcon,
  NewTwitterIcon,
  GoogleMapsIcon,
  Linkedin01Icon,
  YoutubeIcon,
} from "@hugeicons-pro/core-stroke-rounded/index";

// Helper function to create icon
const createIcon = (iconComponent: any) =>
  createElement(HugeiconsIcon, { icon: iconComponent, className: "size-4 flex-shrink-0" });

export interface SocialMediaType {
  id: number;
  typeName: string;
  icon: ReactElement;
  placeholder: string;
  regex: RegExp;
}

// Static social media types with validation regex
export const socialMediaTypes: SocialMediaType[] = [
  {
    id: 1,
    typeName: "Website",
    placeholder: "https://yourwebsite.com",
    icon: createIcon(AiWebBrowsingIcon),
    regex: /^https:\/\/[\w.-]+\.[a-z]{2,}(\/\S*)?$/,
  },
  {
    id: 2,
    typeName: "Facebook",
    placeholder: "https://facebook.com/username",
    icon: createIcon(Facebook02Icon),
    regex: /^https:\/\/[\w.-]+\.[a-z]{2,}(\/\S*)?$/,
  },
  {
    id: 3,
    typeName: "Instagram",
    placeholder: "https://instagram.com/username",
    icon: createIcon(InstagramIcon),
    regex: /^https:\/\/[\w.-]+\.[a-z]{2,}(\/\S*)?$/,
  },
  {
    id: 4,
    typeName: "Twitter",
    placeholder: "https://x.com/username",
    icon: createIcon(NewTwitterIcon),
    regex: /^https:\/\/[\w.-]+\.[a-z]{2,}(\/\S*)?$/,
  },
  {
    id: 5,
    typeName: "Google Map",
    placeholder: "https://maps.app.goo.gl/locationId",
    icon: createIcon(GoogleMapsIcon),
    regex: /^https:\/\/[\w.-]+\.[a-z]{2,}(\/\S*)?$/,
  },
  {
    id: 6,
    typeName: "LinkedIn",
    placeholder: "https://linkedin.com/in/username",
    icon: createIcon(Linkedin01Icon),
    regex: /^https:\/\/[\w.-]+\.[a-z]{2,}(\/\S*)?$/,
  },
  {
    id: 7,
    typeName: "YouTube",
    placeholder: "https://youtube.com/channel/username",
    icon: createIcon(YoutubeIcon),
    regex: /^https:\/\/[\w.-]+\.[a-z]{2,}(\/\S*)?$/,
  },
];
