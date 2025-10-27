import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState, FC } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import { AgrReviewDetails } from "@/types/provider-details";
import ButtonSecondary from "@/components/ui/button/types/button-secondary";
import GooglePng from "@/assets/google.png";
import { HugeiconsIcon } from "@hugeicons/react";
import useReviewStore from "@/store/detailscreen/review-store";
import {
  MessageQuestionIcon,
  QuestionIcon,
  SafeIcon,
  SaveMoneyDollarIcon,
  StarsIcon,
  WheelchairIcon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import { CircleArrowRight01Icon } from "@hugeicons-pro/core-stroke-standard/index";
import { renderProgressBar } from "@/components/ui/ProgressBar/progress-bar";
import StarRating from "@/components/ui/StarRating/star-rating";
import { formatRating } from "@/utils/overall-ratings";

dayjs.extend(relativeTime);

export interface ReviewSummaryProps {
  agrReviews: AgrReviewDetails;
  reviewContainerRef: React.RefObject<HTMLDivElement>;
}

const ReviewSummary: FC<ReviewSummaryProps> = ({
  agrReviews,
  reviewContainerRef,
}) => {
  const MAX_LENGTH = 300;
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(
    new Set()
  );

  const { setIsReviewModalOpen } = useReviewStore();

  const getReviewText = (review: string, index: number): string => {
    const fullText = review ?? "";
    if (!expandedReviews.has(index) && fullText.length > MAX_LENGTH) {
      return fullText.toString().substring(0, MAX_LENGTH) + "...";
    }
    return fullText.toString();
  };
  const handleClick = (index: number) => {
    setExpandedReviews((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return updated;
    });
  };
  const reviewCategoryRating = [
    {
      title: "Cleanliness",
      rating: 5.0,
      icon: StarsIcon,
    },
    {
      title: "Safety",
      rating: 4.0,
      icon: SafeIcon,
    },
    {
      title: "Staff & Support",
      rating: 5.0,
      icon: QuestionIcon,
    },
    {
      title: "Communication",
      rating: 4.5,
      icon: MessageQuestionIcon,
    },
    {
      title: "Accessibility",
      rating: 4.5,
      icon: WheelchairIcon,
    },
    {
      title: "Value",
      rating: 4.0,
      icon: SaveMoneyDollarIcon,
    },
  ];

  return (
    <div
      ref={reviewContainerRef}
      className="w-full flex flex-col items-start justify-start border border-transparent md:border-neutral-200 rounded-2xl
      px-0 py-0 gap-6 md:px-[2rem] md:pt-[1.5rem] md:pb-[2rem]"
    >
      {/* Title */}
      <p className="text-2xl font-semibold">Reviews</p>
      {/* Review Overview */}
      <div
        className="w-full flex items-center justify-between border border-neutral-300 rounded-2xl px-[1rem] 
      md:px-[2rem] py-[.5rem] md:py-[1.5rem]"
      >
        <div className="flex items-center justify-start gap-4 sm:gap-8">
          <img alt="Load again" src={GooglePng.src} className="size-[42px]" />
          <p className="hidden md:block text-sm md:text-base leading-[18px] text-wrap text-neutral-500 font-semibold">
            These reviews are based on public opinions and feedback collected
            <span className="hidden xl:inline">
              <br />
            </span>{" "}
            from Google.
          </p>
          <p className="hidden xsm:block md:hidden text-sm text-neutral-500 font-semibold">
            Based on Google Reviews
          </p>
        </div>
        <div className="flex items-center justify-start xsm:justify-end gap-2 xsm:gap-4 ms:gap-6 md:gap-8 lg:gap-4 xl:gap-6 2xl:gap-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl font-semibold text-neutral-900">
              {formatRating(agrReviews?.rating)}
            </p>
            <StarRating
              rating={agrReviews?.rating || 0}
              className="flex gap-1"
              starSize="size-[1rem]"
            />
          </div>
          <div className="h-12 border border-neutral-200"></div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl font-semibold text-neutral-900">
              {agrReviews?.user_ratings_total}
            </p>
            <p className="text-base text-neutral-500 font-semibold">Reviews</p>
          </div>
        </div>
      </div>
      {/* Review Progress */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-[.25rem]">
        {reviewCategoryRating.map((e, i) => (
          <div key={i}>
            {renderProgressBar(e.rating, e.title, e.icon)}
            {/* <e.icon className="w-10 h-10" /> */}
          </div>
        ))}
      </div>
      {/* Reviews */}
      <div className="w-full flex flex-col items-start justify-start">
        {agrReviews?.reviews &&
          agrReviews.reviews?.length > 0 &&
          agrReviews.reviews.slice(0, 4).map((r, i: number) => (
            <div
              key={i}
              className="w-full flex items-start justify-content-start gap-[1rem] border-b border-gray-200 last:border-b-0 py-[1rem]"
            >
              <Avatar
                sizeClass="h-10 w-10 text-lg"
                radius="rounded-full"
                imgUrl={r?.profile_photo_url}
                userName={r.author_name}
                textSize="text-base"
              />
              <div className="w-full flex flex-col items-start justify-start">
                <div className="w-full flex items-start justify-between">
                  <div className="flex flex-col items-start">
                    <p className="text-base font-semibold">{r.author_name}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {r.relative_time_description}
                    </p>
                  </div>
                  <StarRating
                    rating={r.rating}
                    className="flex gap-1"
                    starSize="size-[1rem]"
                  />
                </div>
                {/* Reviews */}
                <p className="block mt-3 text-sm text-neutral-600 dark:text-neutral-300 leading-[1.25rem]">
                  {getReviewText(r.text, i)}
                  {r.text && r.text.length > MAX_LENGTH && (
                    <span
                      className="text-blue-500 ml-2 cursor-pointer"
                      onClick={() => handleClick(i)}
                    >
                      {expandedReviews.has(i) ? "Read less" : "Read more"}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>
      {/*Review Redirect Button */}
      {agrReviews?.reviews?.length > 4 && (
        <div className="items-center justify-center flex w-full">
          <button
            onClick={() =>
              window.open(agrReviews.url || "https://maps.google.com", "_blank")
            }
          >
            <ButtonSecondary className="gap-3">
              <span>View more</span>
              <HugeiconsIcon
                icon={CircleArrowRight01Icon}
                className="size-[1.25rem]"
                strokeWidth={2}
              />
            </ButtonSecondary>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewSummary;
