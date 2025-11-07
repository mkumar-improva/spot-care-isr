import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons-pro/core-stroke-sharp/index";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons-pro/core-stroke-standard/index";
import ImageGalleryStore from "@/store/dialog/image-gallery-store";
import { APP_CONSTANTS } from "constants/AppConstants";
import { variants } from "@/utils/animation-variants";
import { useSwipeable } from "react-swipeable";

const ImageModal = () => {
  const { setIsImageGalleryOpen, selectedProviderDetail } = ImageGalleryStore();
  const availableImages = (selectedProviderDetail?.images || [])
    .filter((img) => img.imageTypeId === 1 || img.imageTypeId === 2)
    .slice()
    .sort((a, b) => a.imageOrder - b.imageOrder);
  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(
    availableImages
      ? availableImages[currentIndex].imagePath
      : APP_CONSTANTS.DUMMY_IMAGE
  );
  const totalImages = availableImages?.length ?? 0;

  const moveLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setDirection(-1);
    }
  };

  const moveRight = () => {
    if (currentIndex + 1 < totalImages) {
      setCurrentIndex((prev) => prev + 1);
      setDirection(1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex + 1 < totalImages) {
        setCurrentIndex((prev) => prev + 1);
        setDirection(1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        setDirection(-1);
      }
    },
    trackMouse: true,
  });

  const changePhoto = (newVal: number) => {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  };

  useEffect(() => {
    if (availableImages) {
      setCurrentImage(
        availableImages
          ? availableImages[currentIndex].imagePath
          : APP_CONSTANTS.DUMMY_IMAGE
      );
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        moveLeft();
      } else if (event.key === "ArrowRight") {
        moveRight();
      } else if (event.key === "Escape") {
        setIsImageGalleryOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, totalImages, setIsImageGalleryOpen]);

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="hidden absolute top-5 right-5 xl:flex items-center gap-2 p-3 z-[80]">
        <button
          className="rounded-full bg-gray-400/50 md:p-3 p-2 text-white/75 backdrop-blur-lg transition hover:bg-gray-600 hover:text-white
"
          onClick={() => setIsImageGalleryOpen(false)}
        >
          <HugeiconsIcon
            icon={Cancel01Icon}
            strokeWidth={1.2}
            color="currentcolor"
            className="size-5  md:size-7"
          />
        </button>
      </div>
      <div className="hidden absolute inset-0 mx-auto xl:flex  items-center justify-center">
        {loaded && (
          <>
            {currentIndex > 0 && (
              <button
                className="absolute left-5 top-[calc(50%-16px)] rounded-full bg-gray-400/50 p-2 md:p-3
             text-white/75 backdrop-blur-lg transition hover:bg-gray-600 hover:text-white focus:outline-none z-[80]"
                style={{ transform: "translate3d(0, 0, 0)" }}
                onClick={moveLeft}
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  strokeWidth={1.2}
                  color="currentcolor"
                  className="size-3  md:size-7"
                />
              </button>
            )}
            {availableImages && currentIndex + 1 < availableImages.length && (
              <button
                className="absolute right-5 top-[calc(50%-16px)] rounded-full bg-gray-400/50 p-2 md:p-3
             text-white/75 backdrop-blur-lg transition hover:bg-gray-600 hover:text-white focus:outline-none z-[80]"
                onClick={moveRight}
              >
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  strokeWidth={1.2}
                  color="currentcolor"
                  className="size-3  md:size-7"
                />
              </button>
            )}
          </>
        )}
      </div>
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-4xl items-center"
        {...handlers}
      >
        {/* Main Image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants()}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute top-0 left-0 w-full h-full"
              >
                <img
                  src={currentImage || ""}
                  alt="Chisfis listing gallery"
                  onLoad={() => setLoaded(true)}
                  sizes="(max-width: 1025px) 100vw, 1280px"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = APP_CONSTANTS.DUMMY_IMAGE;
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* buttons */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {/* Navigation buttons */}
          <div className="xl:hidden absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
            {loaded && (
              <>
                {currentIndex > 0 && (
                  <button
                    className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-2 md:p-3 text-white/75 
                    backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={moveLeft}
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      strokeWidth={1.2}
                      color="currentcolor"
                      className="size-3 ms:size-5"
                    />
                  </button>
                )}
                {availableImages &&
                  currentIndex + 1 < availableImages.length && (
                    <button
                      className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-2 md:p-3
                     text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                      onClick={moveRight}
                    >
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        strokeWidth={1.2}
                        color="currentcolor"
                        className="size-3 ms:size-5"
                      />
                    </button>
                  )}
              </>
            )}
          </div>
          {/* Full preview Icon and download icon */}
          {/* <div className="absolute top-0 right-0 flex items-center gap-3 p-3">
            <a
              href={currentImage}
              className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
              target="_blank"
              title="Open fullsize version"
              rel="noreferrer"
            >
              <HugeiconsIcon
                icon={FullScreenIcon}
                strokeWidth={1.2}
                color="currentcolor"
                className="size-3 md:size-5"
              />
            </a>
            <button
              className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
              onClick={() => downloadPhoto(currentImage, `${currentIndex}.jpg`)}
            >
              <HugeiconsIcon
                icon={Download04Icon}
                strokeWidth={1.2}
                color="currentcolor"
                className="size-3 md:size-5"
              />
            </button>
          </div> */}
          {/*Close Icon*/}
          <div className="xl:hidden absolute top-0 right-0 flex items-center gap-2 p-3">
            <button
              className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
              onClick={() => setIsImageGalleryOpen(false)}
            >
              <HugeiconsIcon
                icon={Cancel01Icon}
                strokeWidth={1.2}
                color="currentcolor"
                className="size-3 ms:size-5"
              />
            </button>
          </div>
          {/* Bottom Nav bar */}
          <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
            <motion.div
              initial={false}
              className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
            >
              <AnimatePresence initial={false}>
                {availableImages &&
                  availableImages.map((e, i) => (
                    <motion.button
                      initial={{
                        width: "0%",
                        x: `${Math.max((currentIndex - 1) * -100, 15 * -100)}%`,
                      }}
                      animate={{
                        scale: i === currentIndex ? 1.25 : 1,
                        width: "100%",
                        x: `${Math.max(currentIndex * -100, 15 * -100)}%`,
                      }}
                      exit={{ width: "0%" }}
                      key={e.imageOrder}
                      onClick={() => changePhoto(i)}
                      className={`${
                        i === currentIndex
                          ? "z-20 rounded-md shadow shadow-black/50"
                          : "z-10"
                      } ${i === 0 ? "rounded-l-md" : ""} ${
                        i === availableImages.length - 1 ? "rounded-r-md" : ""
                      } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                    >
                      <img
                        alt="small photos on the bottom"
                        width={180}
                        height={120}
                        className={`${
                          i === currentIndex
                            ? "brightness-110 hover:brightness-110"
                            : "brightness-50 contrast-125 hover:brightness-75"
                        } h-full transform object-cover transition`}
                        src={e.imagePath ?? ""}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = APP_CONSTANTS.DUMMY_IMAGE;
                        }}
                      />
                    </motion.button>
                  ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default ImageModal;
