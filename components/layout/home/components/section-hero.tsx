"use client";
import { FC } from "react";
import useLoadingState from "store/loader/loding-state";
import { TypeAnimation } from "react-type-animation";
import imagePng from "assets/app/banner.png";
import Image from "next/image";
import PageHomeSearchForm from "@/components/search/components/page-home-search-form";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import useSearchUiStore from "@/store/ui/search-ui-store";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  const { loading } = useLoadingState();
  const { setShowHeroMobileSearch } = useSearchUiStore();

  return (
    <div className="nc-PageHome relative">
      <div className="relative space-y-24 mb-18 lg:space-y-28 lg:mb-28">
        {/* Main content container: left text + right image */}
        <div
          className="flex flex-col xl:flex-row justify-between items-center xl:items-start 
        w-full gap-10 xl:gap-20 px-4 2xl:px-20 mt-0 xl:mt-10 xl:mt-18 3xl:mt-24"
        >
          {/* Left Column: Text + Typing Animation */}
          <div className="w-full xl:w-10/12 flex flex-col items-center xl:items-start  space-y-8 sm:space-y-10 py-7 xl:pb-20 xl:pr-10">
            <h2 className="font-medium pt-8 text-[2rem] xsm:text-[2.5rem] ms:text-6xl xl:text-[4rem] leading-[114%] opacity-0 animate-fade-in">
              Spot your
            </h2>
            <TypeAnimation
              sequence={[
                "Care",
                2000,
                "Skilled Nursing",
                1000,
                "Pharmacies",
                1000,
                "Hospitals",
                1000,
                "Home Health",
                1000,
                "Adult Day Care",
                1000,
                "Assisted Living",
                1000,
                "Transportation",
                1000,
                "Homeless Care",
                1000,
              ]}
              wrapper="h4"
              speed={30}
              style={{ display: "block", paddingBottom: "0.25em" }}
              repeat={Infinity}
              // className="font-medium text-base text-primary xs:text-3xl md:text-5xl 2xl:text-[4rem] leading-[114%] opacity-0 animate-fade-in"
              className="font-medium text-[2rem] xsm:text-[2.5rem] ms:text-6xl xl:text-[4rem] leading-[114%] 
              opacity-0 animate-fade-in bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r
               from-purple-500 via-violet-500 to-pink-300"
            />
            <div className="w-full flex items-center justify-center pt-[1rem]">
              <ButtonPrimary
                loading={loading}
                className="w-[80%] md:hidden bg-primary-700 hover:bg-primary-800
                 font-medium text-white py-2 text-lg rounded-full"
                onclick={() => setShowHeroMobileSearch(true)}
              >
                Start your search
              </ButtonPrimary>
            </div>
          </div>
          {/* Right Column: Image */}
          <div className="hidden xl:flex w-full justify-center">
            <Image
              src={imagePng}
              alt={"Spot.care"}
              className="w-full  rounded-3xl animate-fade-in object-cover"
            />
          </div>
        </div>
        {/* Search Form (only on xl screens and above) */}
        <div
          className="hidden md:flex md:justify-center xl:flex-none xl:justify-normal absolute md:inset-x-0 xl:left-0 
         xl:right-auto z-10 top-40 md:top-[8rem] lg:top-[8rem] xl:top-[12rem] 2xl:top-[15rem] mb-12"
        >
          <PageHomeSearchForm isHomePage={true} />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
