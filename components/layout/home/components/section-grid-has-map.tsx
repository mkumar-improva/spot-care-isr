"use client";
import { FC, RefObject, useState } from "react";
import useHomeDataStore from "@/store/data/home-data-store";
import CustomHeading from "./custom-heading";
import ProviderCard from "@/components/ui/provider-card/provider-card";
import HomePagination from "./home-pagination";
import ButtonClose from "@/components/ui/button/types/button-close";
import GMap from "@/components/ui/g-map/g-map";

interface SectionGridHasMapProps {
  customHeadingRef?: RefObject<HTMLDivElement>;
}

const SectionGridHasMap: FC<SectionGridHasMapProps> = ({
  customHeadingRef,
}) => {
  const { homeFilteredPaginatedList, homePageLocation, homeProviderList } =
    useHomeDataStore();
  //state
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  //handlers
  const handlePageChange = () => {
    const offset = window.innerWidth < 768 ? 80 : 120;
    const element = customHeadingRef?.current;

    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
      element.focus?.();
    }
  };
  return (
    <div className="relative flex min-h-screen gap-[1.5rem]">
      {/* List */}
      <div
        className="min-h-screen w-full md:w-full lg:w-[45%] xl:w-[60%] flex-shrink-0"
        ref={customHeadingRef}
      >
        <div className="scroll-mt-[120px]">
          <CustomHeading
            heading={`Skilled Nursing in ${homePageLocation}`}
            subHeading={`${homeProviderList.length} Providers Near You`}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          {homeFilteredPaginatedList.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => {
                setCurrentHoverID((_) => item.code);
              }}
              onMouseLeave={() => {
                setCurrentHoverID((_) => -1);
              }}
            >
              {/* Provider Card Component */}
              <ProviderCard data={item} />
            </div>
          ))}
        </div>
        <div className="flex mt-[2rem] justify-center items-center">
          <HomePagination pageCount={10} onPageChange={handlePageChange} />
        </div>
      </div>
      {/* Map */}
      <div
        className={`2xl:static lg:block lg:w-[55%] xl:w-[40%] flex-shrink-0 ${
          showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
        }`}
      >
        {showFullMapFixed && (
          <ButtonClose
            onClick={() => setShowFullMapFixed(false)}
            className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
          />
        )}
        <div className="fixed lg:sticky top-0 lg:top-[88px] left-0 w-full h-full lg:h-[calc(100vh-88px)] rounded-2xl overflow-hidden">
          <GMap
            paginatedList={homeFilteredPaginatedList}
            selectedId={currentHoverID}
            latLng={{
              lat: 40.7127753,
              lng: -74.0059728,
            }}
            recenterClassName="top-5 right-2"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
