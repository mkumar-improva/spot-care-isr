"use client";

import { FC } from "react";
import BgGlassmorphism from "./bg-glass-morphism";

interface HomeProviderListProps {
  className?: string;
}

const HomeProviderList: FC<HomeProviderListProps> = ({ className }) => {
  return (
    <div
      className={`nc-ListingStayMapPage relative ${className}`}
      data-nc-id="ListingStayMapPage"
    >
      <BgGlassmorphism />
    </div>
  );
};

export default HomeProviderList;
