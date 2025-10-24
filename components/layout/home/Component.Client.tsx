"use client";
import BgGlassmorphism from "./components/bg-glass-morphism";
import SectionHero from "./components/section-hero";
import useLoadingState from "store/loader/loding-state";
import Loading from "@/components/ui/loading/loading";
import useHomeDataStore from "store/data/home-data-store";
import HomeProviderList from "./components/home-provider-list";

const HomePageComponent = () => {
  const { loading } = useLoadingState();
  const { homeFilteredPaginatedList } = useHomeDataStore();

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
            {/* SECTION HERO */}
            <SectionHero className="p-5 sm:p-8 md:p-0 md:mt-4 lg:mb-72 lg:mt-8" />
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
            <HomeProviderList />
          </div>
        )
      )}
    </>
  );
};

export default HomePageComponent;
