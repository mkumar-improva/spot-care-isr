"use client";

import React, { useRef, useEffect } from "react";
import Logo from "@/components/ui/logo";
import logoImg from "@/assets/app/spot/full.png";
import NavBarElements from "./navbar-elements";
import RenderButtonOpenHeroSearch from "./render-button-open-hero-search";
import useHeaderUiStore from "store/ui/header-ui-store";
import SearchComponent from "@/components/search/Component";

const HeaderNav = () => {
  /*----------Begining of Store Import----------*/
  const { showHeroSearch, setShowHeroSearch } = useHeaderUiStore();
  /*----------End of Store Import----------*/

  const heroSearchRef = useRef<HTMLDivElement>(null);

  /*----------Start of Click Outside Handler----------*/
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        heroSearchRef.current &&
        !heroSearchRef.current.contains(event.target as Node)
      ) {
        setShowHeroSearch(false);
      }
    };

    if (showHeroSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHeroSearch, setShowHeroSearch]);
  /*----------End of Click Outside Handler----------*/

  return (
    <>
      {/* Overlay for Hero Search */}
      <div
        className={`nc-Header nc-Header-3 fixed z-40 top-0 inset-0 bg-black/30 dark:bg-black/50 transition-opacity will-change-[opacity] hidden md:block ${
          showHeroSearch
            ? "visible"
            : "invisible opacity-0 pointer-events-none"
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
              className="w-[7.25rem] relative z-[999999]"
            />
            {/* Hero Search */}
            <div className={`ml-[12rem] hidden xl:block`} ref={heroSearchRef}>
              <div className="block">
                <RenderButtonOpenHeroSearch />
                <div className="lg:hidden w-full max-w-lg mx-auto"></div>
                <SearchComponent />
              </div>
            </div>
            {/* Right Side Elements */}
            <NavBarElements />
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderNav;
