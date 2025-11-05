"use client";
import { FC, RefObject, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { homeFilteredPaginatedList, homePageLocation, homeProviderList } =
    useHomeDataStore();
  //state
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [navigatingId, setNavigatingId] = useState<string | number | null>(null);
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

  const handleProviderClick = (provider: any) => {
    const detailUrl = `/detail-screen/${provider.code}?lat=${provider.locations[0]?.latitude || 40.7127753}&lon=${provider.locations[0]?.longitude || -74.0059728}&distance=${provider.distanceInMiles || 0}`;
    // set navigating id so the specific ProviderCard can show the loader
    setNavigatingId(provider.code);
    // small timeout so UI can update and show the loader before navigation begins
    setTimeout(() => {
      router.push(detailUrl);
    }, 50);
  };
  return (
    <div className="relative flex min-h-screen gap-[1.5rem]">
      {/* List */}
      <div
        className="min-h-screen w-full md:w-full lg:w-[45%] xl:w-[60%] flex-shrink-0"
        ref={customHeadingRef}
      >
        {/* Top-right loader (shows during navigation to detail) - using the same spinner SVG as login button */}
        {navigatingId !== null && (
          <div className="absolute right-4 top-4 z-50">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
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
              onClick={() => handleProviderClick(item)}
              onMouseEnter={() => {
                setCurrentHoverID((_) => item.code);
              }}
              onMouseLeave={() => {
                setCurrentHoverID((_) => -1);
              }}
              className="cursor-pointer transition-all hover:shadow-lg"
            >
              {/* Provider Card Component */}
              <ProviderCard data={item} navigating={navigatingId === item.code} />
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
