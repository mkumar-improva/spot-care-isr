"use client";

import { FC } from "react";
import BgGlassmorphism from "./bg-glass-morphism";
import SectionGridHasMap from "./section-grid-has-map";

interface HomeProviderListProps {
  className?: string;
  customHeadingRef?: React.RefObject<HTMLDivElement>;
}

const HomeProviderList: FC<HomeProviderListProps> = ({
  className,
  customHeadingRef,
}) => {
  return (
    <div
      className={`nc-ListingStayMapPage relative ${className}`}
      data-nc-id="ListingStayMapPage"
    >
      <BgGlassmorphism />

      {/* Section */}
      <div className="xl:max-w-none">
        <SectionGridHasMap customHeadingRef={customHeadingRef} />
      </div>
    </div>
  );
};

export default HomeProviderList;
