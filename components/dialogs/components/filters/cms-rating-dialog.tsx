"use client";
import Slider from "rc-slider";
import SliderStarRating from "@/components/ui/StarRating/slider-star-rating";
import ButtonClose from "@/components/ui/button/types/button-close";
import useRenderRatingFilter from "@/hooks/list/use-render-rating-filter";
import usePageListDialogStore from "@/store/dialog/page-list-dialog-store";

const CmsRatingDialog = () => {
  //hooks
  const {
    rangeRatings,
    handleRatingChange,
    setIsCmsRatingsDialogOpen,
  } = useRenderRatingFilter();

  return (
    <div className="relative w-[80vw]  md:w-[60vw] lg:hidden rounded-xl flex flex-col gap-[2rem]">
      {/* Dialog header */}
      <div className="flex flex-row text-neutral-700 dark:text-neutral-300 text-center justify-between items-center border-b dark:border-neutral-800 p-4 relative">
        <p className="text-xl font-semibold flex-grow">CMS Rating</p>
      </div>
      {/* Dialog Content */}
      <div className="w-full pl-6 pr-5 pt-0 pb-5 flex flex-col gap-6">
        <div className="space-y-5">
          <span className="text-base font-medium">Select CMS rating range</span>
          <Slider
            range
            className="text-red-400"
            min={0}
            max={5}
            defaultValue={[rangeRatings[0], rangeRatings[1]]}
            allowCross={false}
            onChangeComplete={(e) => handleRatingChange(e as number[])}
          />
        </div>
        <span className="flex justify-evenly text-base">
          min
          <SliderStarRating
            reviewCount={5}
            point={rangeRatings[0]}
            isSelector={false}
          />
          <span className="text-base ml-2 mr-2">-</span>
          max
          <SliderStarRating
            reviewCount={5}
            point={rangeRatings[1]}
            isSelector={false}
          />
        </span>
      </div>
      {/* Close Button */}
      <span className="absolute right-3 top-3">
        <ButtonClose
          onClick={() => setIsCmsRatingsDialogOpen(false)}
          isHover={false}
        />
      </span>
    </div>
  );
};

export default CmsRatingDialog;
