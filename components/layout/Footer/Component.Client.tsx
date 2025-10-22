"use client";
import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpDoubleIcon } from "@hugeicons-pro/core-stroke-sharp/index";
import { usePathname, useRouter } from "next/navigation";
import useHeaderUiStore from "store/ui/header-ui-store";
import Tooltip from "@/components/ui/tool-tip/tool-tip";
import FooterLogo from "./components/footer-logo";
import SocialsList from "./components/social-list";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

export interface FooterProps {
  className?: string;
  menu: string;
  onClick: () => void;
}

const FooterContent = () => {
  const pathName = usePathname();
  const router = useRouter();

  const { isHomePage } = useHeaderUiStore();

  const [isFooterSize, setIsFooterSize] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    setIsFooterSize(pathName === "/list");
    setIsVisible(pathName !== "/blog");
  }, [pathName]);

  useEffect(() => {
    const handleScroll = () => {
      const width = window.innerWidth;
      const currentScroll = window.scrollY;
      let scrolledToBottom;
      if (width <= 1024) {
        scrolledToBottom =
          window.innerHeight + currentScroll >=
          document.body.scrollHeight - 500;
      } else {
        scrolledToBottom =
          window.innerHeight + currentScroll >= document.body.scrollHeight - 10;
      }
      if (scrolledToBottom) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const footerOptions: FooterProps[] = [
    {
      menu: "FAQ",
      onClick: () => router.push("/faq"),
      className: "col-span-1",
    },
    {
      menu: "Blog",
      onClick: () => router.push("/blog"),
      className: "col-span-1",
    },
    {
      menu: "Terms & Conditions",
      onClick: () => router.push("/terms"),
      className: "col-span-1",
    },
    {
      menu: "Privacy",
      onClick: () => router.push("/privacy"),
      className: "col-span-1",
    },
    {
      menu: "Contact us",
      onClick: () => router.push("/contact"),
      className: "col-span-1",
    },
  ];

  const renderFooterMenuItem = (menu: FooterProps, index: number) => {
    return (
      <h2
        key={index}
        className="text-base text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-500 justify-center cursor-pointer"
        onClick={menu.onClick}
      >
        {menu.menu}
      </h2>
    );
  };

  const handleScrollTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <div
        className={`${
          !isFooterSize ? "px-4" : "px-5"
        } nc-Footer md:px-10 lg:py-2 py-2 relative border-t border-gray-200 dark:border-neutral-700`}
      >
        {/* Scroll Button */}
        {showScrollButton && (
          <button
            onClick={handleScrollTopClick}
            className="hidden md:block absolute top-6 lg:top-auto lg:fixed lg:bottom-6 right-6 z-10  rounded-full bg-white 
          text-primary shadow-lg hover:bg-primary/90 transition animate-bounce-shadow "
            aria-label="Scroll to top"
          >
            <Tooltip text="Scroll to top" position={"left-[-20px] top-[-40px]"}>
              <HugeiconsIcon
                icon={ArrowUpDoubleIcon}
                className="size-8 md:size-10 rounded-full text-primary-400 duration-500"
              />
            </Tooltip>
          </button>
        )}
        <div className="mx-auto my-14 flex flex-col xl:flex-row justify-between items-center xl:items-center space-y-6 xl:space-y-0">
          {/* Footer Logo */}
          <FooterLogo />
          {/* Footer Menu */}
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-center space-y-4 lg:space-y-0 lg:gap-12 text-purple-600 text-base">
            {footerOptions.map(renderFooterMenuItem)}
          </div>
          {/* Social Media Links */}
          <div className="flex justify-start items-start lg:items-center space-x-4">
            <SocialsList />
          </div>
        </div>
        <span className="w-full flex justify-center text-center   text-xs font-thin text-gray-400">
          Spot.care is a service provided by Pellucid Labs, LLC.
          <br />
          Spot.care does not employ any caregiver or provider and is not
          responsible for the conduct of any user of our site. All information
          shown on our site is not verified by Spot.care.
          <br />
          You need to do your own diligence to ensure the provider or caregiver
          you choose is appropriate for your needs and complies with applicable
          laws.
        </span>
        <span className="w-full flex justify-center text-center text-sm font-thin text-gray-400 py-6">
          &#169; {new Date().getFullYear()} Spot.care - All rights reserved.
        </span>
      </div>
    )
  );
};

export default FooterContent;
