import { MenuSquareIcon } from "@hugeicons-pro/core-stroke-rounded/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { Image } from "@/types/provider-details";
import { APP_CONSTANTS } from "@/constants/AppConstants";
import placeHolderSvg from "@/assets/PlaceHolders/placeholder.svg";

function ImageGallery({ images, onShowGallery }: { images: Image[]; onShowGallery?: () => void }) {
  const sortedImages = Array.isArray(images)
    ? images
        .filter((img) => img.imageTypeId === 1 || img.imageTypeId === 2)
        .slice()
        .sort((a, b) => a.imageOrder - b.imageOrder)
    : [];


  const primaryImageObj = sortedImages[0];
  const gridImages = sortedImages.slice(0);

  const primaryImageSrc = primaryImageObj?.imagePath;

  const openModal = () => onShowGallery?.();

  if (!primaryImageSrc && gridImages.length === 0) return null;
  return (
    <div className="w-full rounded-md sm:rounded-xl h-[30vh]">
      <div className="relative grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-2 h-full">
        {/* Primary Image Layout */}
        {primaryImageSrc && (
          <div
            className="col-span-2 row-span-2 md:row-span-1 relative rounded-md md:rounded-xl overflow-hidden cursor-pointer h-full"
            onClick={openModal}
          >
            <img
              className="absolute inset-0 object-cover rounded-md md:rounded-xl w-full h-full"
              src={primaryImageSrc || placeHolderSvg}
              alt="Load again"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = APP_CONSTANTS.DUMMY_IMAGE;
              }}
            />
          </div>
        )}

        {/* Grid Image Layout */}
        {gridImages
          ?.filter((_, i) => i >= 1 && i < 3)
          .map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md md:rounded-xl overflow-hidden ${
                index >= 3 ? "hidden sm:block" : ""
              }`}
            >
              <div className="aspect-w-6 aspect-h-5 h-full">
                <img
                  className="absolute inset-0 object-cover rounded-md md:rounded-xl w-full h-full"
                  src={item.imagePath || ""}
                  alt=""
                  sizes="600px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = APP_CONSTANTS.DUMMY_IMAGE;
                  }}
                />
              </div>
              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"
                onClick={openModal}
              />
            </div>
          ))}

        {/* Show All Button */}
        <button
          className="absolute flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
          onClick={openModal}
        >
          <HugeiconsIcon
            icon={MenuSquareIcon}
            className="size-4 md:size-5"
            aria-hidden="true"
          />
          <span className="ml-2 text-neutral-800 text-xs md:text-sm font-medium">
            Show all photos
          </span>
        </button>
      </div>
    </div>
  );
}

export default ImageGallery;
