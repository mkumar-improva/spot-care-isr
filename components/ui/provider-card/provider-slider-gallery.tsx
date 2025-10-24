"use client";

import { FC } from "react";
import { Providers } from "@/types/provider-details";
import ImageSlider from "./image-slider";
import placeHolderSvg from "@/assets/PlaceHolders/placeholder.svg";

interface ProviderSliderGalleryProps {
  data: Providers;
  fromDrawer?: boolean;
}

const ProviderSliderGallery: FC<ProviderSliderGalleryProps> = ({
  data,
  fromDrawer = false,
}) => {
  return (
    <div
      className={` relative flex-shrink-0 w-full overflow-hidden
        h-48 ${fromDrawer ? "md:h-[10.75rem]" : "md:h-[10.75rem]"}
        md:w-60 lg:w-auto xl:w-60
        md:border-l lg:border-none xl:border-l dark:border-neutral-800`}
    >
      {/* Render the provider images here */}
      <ImageSlider
        images={
          data.images && data.images.length > 0
            ? data.images
                .slice()
                .sort((a, b) => a.imageOrder - b.imageOrder)
                .map((img) => img.imagePath)
            : [placeHolderSvg]
        }
      />
    </div>
  );
};

export default ProviderSliderGallery;
