import {
  Clock01Icon,
  FavouriteIcon,
  HourglassIcon,
  AccountSetting03Icon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import { renderProgressBar } from "@/components/ui/ProgressBar/progress-bar";
import StarRating from "@/components/ui/StarRating/star-rating";
// import MedicareLogo from "../../../../../images/logos/medicare.png";

interface Rating {
  overall: number;
  healthInspection: number;
  qualityMeasure: number;
  staffRating: number;
  longStayQuality: number;
  shortStatyQuality: number;
  lastupdated: string;
  moreinfo?: string;
  abusereport?: string;
  metadata?: Record<string, any>;
}

interface RatingProps {
  rating: Rating;
  cmsContainerRef?: React.RefObject<HTMLDivElement>;
}

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium border rounded-xl text-white bg-[#3242e1]">
    {children}
  </div>
);

export default function RatingSection({
  rating,
  cmsContainerRef,
}: RatingProps) {
  return (
    <div
      ref={cmsContainerRef}
      className="w-full flex flex-col border border-transparent md:border-neutral-200 px-0 py-0 gap-6 
      md:px-[2rem] md:pt-[1.5rem] md:pb-[2rem] rounded-2xl "
    >
      <p className="text-2xl font-semibold">CMS ratings</p>
      {/* CMS Rating Overview */}
      <div
        className="w-full flex items-center justify-between border border-neutral-300 px-[1rem] 
      md:px-[2rem] py-[.5rem] md:py-[1.5rem] rounded-2xl"
      >
        <div className="flex items-center justify-start gap-4">
          {/* <img alt="Medicare" className="w-[7.25rem]" src={MedicareLogo} /> */}
          <p className="hidden md:block text-sm md:text-base leading-[18px] text-wrap text-neutral-500 font-semibold">
            These ratings are based on verified quality metrics and patient
            survey data
            <span className="hidden xl:inline">
              <br />
            </span>{" "}
            from{" "}
            <span
              onClick={() => {
                window.open(
                  rating?.moreinfo || "",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="text-primary-500 underline cursor-pointer"
            >
              Medicare.gov.
            </span>
          </p>
          <p className="text-sm hidden xsm:block md:hidden leading-[18px] text-wrap text-neutral-500 font-semibold">
            Based on{" "}
            <span
              onClick={() => {
                window.open(
                  rating?.moreinfo || "",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="text-primary-500 underline cursor-pointer"
            >
              Medicare.gov.
            </span>{" "}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-semibold text-neutral-900">
            {rating.overall || <span className="text-gray-500">N/A</span>}
          </p>
          <StarRating
            rating={rating.overall || 0}
            className="flex gap-1"
            starSize="size-[1rem]"
          />
        </div>
      </div>
      {/* CMS Rating Details */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-[.25rem]">
        {renderProgressBar(
          rating.healthInspection,
          "Health inspection",
          FavouriteIcon
        )}
        {renderProgressBar(
          rating.qualityMeasure,
          "Short stay quality",
          HourglassIcon
        )}
        {renderProgressBar(
          rating.staffRating,
          "Staff quality",
          AccountSetting03Icon
        )}
        {renderProgressBar(
          rating.longStayQuality,
          "Long stay quality",
          Clock01Icon
        )}
      </div>
    </div>
  );
}
