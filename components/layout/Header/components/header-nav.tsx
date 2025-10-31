"use client";

import React, { useRef, useState, useEffect } from "react";
import Logo from "@/components/ui/logo";
import logoImg from "@/assets/app/spot/full.png";
import NavBarElements from "./navbar-elements";
import RenderButtonOpenHeroSearch from "./render-button-open-hero-search";
import useHeaderUiStore from "store/ui/header-ui-store";
import SearchComponent from "@/components/search/Component";
import { useOutsideAlerter } from "@/hooks/common/use-outsider-click";
import SearchTab from "./search-tab";
import AvatarDropDown from "./avatar-drop-down";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import SearchSkeleton from "./search-skeleton";
import HeroSearchSkeleton from "./hero-search-skeleton";
import ProfileSkeleton from "./profile-skeleton";


const HeaderNav = () => {
  /*----------Begining of Store Import----------*/
  const { isHomePage, showHeroSearch, setShowHeroSearch } = useHeaderUiStore();
  const { isLoggedIn, isAuthLoading } = useAuthUIStore();
  const [mounted, setMounted] = useState(false);
  /*----------End of Store Import----------*/

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroSearchRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(
    heroSearchRef,
    () => {
      {
        setShowHeroSearch(false);
      }
    },
    ".pac-container"
  );

  return (
    <>
      {/* Overlay for Hero Search */}
      <div
        className={`nc-Header nc-Header-3 fixed z-40 top-0 inset-0 bg-black/30 dark:bg-black/50 transition-opacity will-change-[opacity] hidden md:block ${
          showHeroSearch ? "visible" : "invisible opacity-0 pointer-events-none"
        } 2xl:px-20 px-4`}
      ></div>
      {showHeroSearch && <div id="nc-Header-3-anchor"></div>}
      {/* Header */}
      <header className="w-full sticky top-0 z-40 border-b border-neutral-100 shadow-sm">
        {/* Background Overlay */}
        <div
          className={` bg-white dark:bg-neutral-900 absolute h-full inset-x-0 top-0 transition-transform will-change-[transform,opacity]
          ${showHeroSearch ? "duration-75" : ""} ${
            showHeroSearch ? "scale-y-[3.6]" : ""
          }`}
        ></div>
        {/* Header Content */}
        <div className="w-full relative px-4 xl:px-[2.35rem] py-3 flex">
          <div className="w-full flex items-center justify-between">
            {/* Logo Element */}
            <Logo
              img={logoImg}
              alt="SpotCare Logo"
              href="/"
              className="w-[4.25rem] md:w-[7.25rem] relative z-[999999]"
            />
            {/* Hero Search: render during initial mount/loading to show centered skeleton */}
            {((!mounted || isAuthLoading) || !isHomePage) && (
              <div className={`ml-[12rem] hidden xl:block`} ref={heroSearchRef}>
                <div className="block">
                  {(!mounted || isAuthLoading) ? (
                    <HeroSearchSkeleton />
                  ) : (
                    <RenderButtonOpenHeroSearch />
                  )}
                  <div className="lg:hidden w-full max-w-lg mx-auto"></div>
                  <SearchComponent />
                </div>
              </div>
            )}
            <div className="flex items-center justify-end gap-4">
              {/* Search Tab */}
              <div className="block md:hidden ml-0">
                {!mounted || isAuthLoading ? <SearchSkeleton /> : <SearchTab />}
              </div>
              {/* Right Side Elements - Show appropriate skeleton during load, then actual component */}
              {!mounted || isAuthLoading ? (
                <ProfileSkeleton />
              ) : isLoggedIn ? (
                <AvatarDropDown />
              ) : (
                <NavBarElements />
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderNav;
