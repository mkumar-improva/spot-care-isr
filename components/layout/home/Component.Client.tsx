"use client";
import BgGlassmorphism from "./components/bg-glass-morphism";
import SectionHero from "./components/section-hero";
import useLoadingState from "store/loader/loding-state";
import Loading from "@/components/ui/Loader/Loading";
import useHomeDataStore from "store/data/home-data-store";
import HomeProviderList from "./components/home-provider-list";
import { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpDoubleIcon } from "@hugeicons-pro/core-stroke-sharp/index";
import Tooltip from "@/components/ui/tool-tip/tool-tip";

const HomePageComponent = () => {
  const [showScrollButton, setShowScrollButton] = useState(true);
  const { loading } = useLoadingState();
  const { homeFilteredPaginatedList } = useHomeDataStore();
  const customHeadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 100) {
        setShowScrollButton(false);
      } else {
        setShowScrollButton(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollClick = () => {
    if (customHeadingRef.current) {
      const offsetTop =
        customHeadingRef.current.getBoundingClientRect().top + window.scrollY;
      const customOffset = 150;
      window.scrollTo({
        top: offsetTop - customOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div
        className="mx-auto w-full px-0 sm:px-4 md:px-0 lg:px-10  
      flex flex-col items-start justify-start max-w-screen-2xl"
      >
        <div
          className={`w-full nc-ListingStayMapPage relative`}
          data-nc-id="ListingStayMapPage"
        >
          <BgGlassmorphism />
          <div className="relative space-y-24 mb-[1.5rem] md:mb-24 lg:space-y-30 lg:mb-36">

          <div className="relative space-y-24 mb-[1.5rem] md:mb-24 lg:space-y-30 lg:mb-36">
            {/* SECTION HERO */}
            <SectionHero className="p-5 sm:p-8 md:p-0 md:mt-4 lg:mb-72 lg:mt-8" />
            {showScrollButton && (
              <button
                className="hidden md:block fixed bottom-6 right-6 z-10  rounded-full bg-white text-primary 
                shadow-lg hover:bg-primary/90 transition animate-bounce-shadow"
                aria-label="Scroll down"
                onClick={handleScrollClick}
              >
                <Tooltip
                  text="Scroll next"
                  position={"left-[-20px] top-[-40px]"}
                >
                  <HugeiconsIcon
                    icon={ArrowUpDoubleIcon}
                    className="size-8 md:size-10 rounded-full text-primary-400 duration-500 rotate-180"
                  />
                </Tooltip>
              </button>
            )}
          </div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="h-[30vh] w-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        homeFilteredPaginatedList &&
        homeFilteredPaginatedList.length > 0 && (
          <div className="pt-1 md:pt-[2rem] lg:pt-0 pb-[2rem] lg:pb-8 px-4 xl:px-[1rem] 2xl:px-[2.8rem]  xl:max-w-none">
            <HomeProviderList customHeadingRef={customHeadingRef} />
          </div>
        )
      )}
    </>
  );
};

export default HomePageComponent;
