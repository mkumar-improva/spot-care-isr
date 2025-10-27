import { useState, useRef, FC } from "react";
import uiUseStore from "@/store/detailscreen/ui-store";
import ServicesList from "@/components/layout/DetailScreen/components/ProviderInfo/components/services-list";
import { formatPhoneNumber, TitleCase } from "@/utils/converter";
import { useCareTypes } from "@/hooks/detailscreen";
import StarRating from "@/components/ui/StarRating/star-rating";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calling02Icon,
  Location01Icon,
  Link01StrokeRounded,
  Mail01Icon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import { formatAddressFromLocations } from "@/utils/format-address";
import SocialMediaSection from "@/components/layout/DetailScreen/components/ProviderInfo/components/social-media-section";
import ProviderAction from "@/components/layout/DetailScreen/components/ProviderInfo/components/provider-action";
import googleIconImage from "@/assets/logos/google.png";
import medicareIconImage from "@/assets/logos/medicare.png";
import { useProviderOverview, useWishlist, useTouchDevice } from "@/hooks/detailscreen/providerinfo";
import { ContainerMap } from "@/components/ui/g-map/container-map";

export interface ProviderInfoProps {
  onScrollDown?: () => void;
  onCmsScrollDown?: () => void;
}

const ProviderInfo: FC<ProviderInfoProps> = ({
  onScrollDown = () => {},
  onCmsScrollDown = () => {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [userDetail, setUserDetail] = useState<Record<string, any>>({});

  const {
    selectedProviderDetail,
  } = uiUseStore();

  const { careTypes } = useCareTypes();
  const providerContainerRef = useRef<HTMLDivElement>(null);

  const { overView } = useProviderOverview(selectedProviderDetail);
  const { isTouchDevice } = useTouchDevice();
  const { isSelected, savedProviders } = useWishlist({
    selectedProviderDetail,
    careTypes,
    userDetail,
  });

  return (
    <div
      className="w-full flex flex-col lg:flex-row items-start justify-start border-transparent md:border
     md:border-neutral-200 rounded-2xl px-0 gap-4 md:px-[2rem] md:py-[2rem]
    "
    >
      {/* Provider Details and Info section */}
      <div
        ref={providerContainerRef}
        className="w-[100%] lg:w-[60%] flex flex-col items-start justify-start gap-4"
      >
        {/* Provider Action for smaller screen */}
        <ProviderAction 
          className="flex lg:hidden" 
          isSelected={isSelected}
          onSave={savedProviders}
        />
        {/* Service Tags */}
        <div className="w-full flex items-center justify-start cursor-pointer gap-[.25rem] pr-[1.5rem] flex-wrap -mt-[3px] lg:mt-0">
          {selectedProviderDetail?.services &&
            selectedProviderDetail?.services.length > 0 && (
              <ServicesList services={selectedProviderDetail?.services} />
            )}
        </div>
        {/* Provider Info header section */}
        <p className="hidden sm:block text-[36px] font-semibold leading-[2.75rem]">
          {TitleCase(selectedProviderDetail?.name.replace("''", "'") ?? "")}
        </p>
        {/* Google and CMS rating Overview Section */}
        {((selectedProviderDetail?.agrReview &&
          selectedProviderDetail?.agrReview?.reviews) ||
          selectedProviderDetail?.rating) && (
          <div className="flex items-center justify-start gap-2 flex-wrap">
            {/* Total Review Overview */}
            {selectedProviderDetail?.agrReview &&
              selectedProviderDetail?.agrReview?.reviews && (
                <div
                  ref={containerRef}
                  onClick={onScrollDown}
                  className="flex items-center justify-start gap-2 cursor-pointer relative group"
                >
                  <img src={googleIconImage.src} alt="Google" className="w-[4.1rem]" />
                  <div className="flex items-center justify-start mb-[1.25px] gap-2">
                    <StarRating
                      rating={
                        selectedProviderDetail?.agrReview?.reviews.rating || 0
                      }
                      className="flex items-center gap-1"
                      starSize="size-[1rem]"
                    />
                    <p className="text-base text-neutral-500 font-medium">
                      ({selectedProviderDetail?.agrReview?.reviews.rating || 0})
                    </p>
                  </div>
                  {!isTouchDevice && (
                    <span
                      className="absolute right-1/2 translate-x-1/2 top-5 mt-2 px-2 py-1 rounded bg-neutral-800 
                text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10"
                    >
                      Google Reviews
                    </span>
                  )}
                </div>
              )}
            {/* Separator dash - only show if both ratings exist */}
            {selectedProviderDetail?.agrReview?.reviews &&
              selectedProviderDetail?.rating && (
                <p className="text-neutral-500">&nbsp;•&nbsp;</p>
              )}
            {/* CMS Rating Overview */}
            {selectedProviderDetail?.rating && (
              <div
                onClick={onCmsScrollDown}
                className="flex items-center justify-start gap-2 cursor-pointer relative group"
              >
                <img
                  src={medicareIconImage.src}
                  alt="Medicare"
                  className="w-[7.25rem]"
                />
                <div className="flex items-center justify-start mb-[1.25px] gap-2">
                  <StarRating
                    rating={selectedProviderDetail?.rating.overall || 0}
                    className="flex items-center gap-1"
                    starSize="size-[1rem]"
                  />
                  <p className="text-base text-neutral-500 font-medium">
                    ({selectedProviderDetail?.rating.overall || 0})
                  </p>
                  {!isTouchDevice && (
                    <span
                      className="absolute right-1/2 translate-x-1/2 top-5 mt-2 px-2 py-1 rounded bg-neutral-800 
                text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10"
                    >
                      medicare.gov
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {/* Provider Details */}
        {/* Provider Address */}
        {selectedProviderDetail?.locations &&
          selectedProviderDetail.locations.length > 0 && (
            <div className="w-fit flex items-center justify-start gap-2 text-neutral-500 -mt-[5px] sm:mt-0">
              <HugeiconsIcon
                icon={Location01Icon}
                color="currentColor"
                strokeWidth={1.2}
                className="size-5 md:size-6 shrink-0"
              />
              <div className="flex items-center gap-1">
                <p className="text-base text-wrap text-neutral-500">
                  <span className="text-gray-500 font-semibold">
                    {selectedProviderDetail.distanceInMiles} mi
                  </span>
                  &nbsp;&nbsp; •&nbsp;&nbsp;
                  {formatAddressFromLocations(selectedProviderDetail.locations)}
                </p>
              </div>
            </div>
          )}
        {/* Provider Info Email */}
        {selectedProviderDetail?.email &&
          selectedProviderDetail.email !== "" && (
            <div className="w-fit flex items-center justify-start gap-2 text-neutral-500">
              <HugeiconsIcon
                icon={Mail01Icon}
                color="currentColor"
                strokeWidth={1.2}
                className="size-5 md:size-6 shrink-0"
              />
              <p className="text-base text-wrap text-neutral-500">
                {selectedProviderDetail.email.toLowerCase() ?? ""}
              </p>
            </div>
          )}
        {/* Provider Info Website */}
        {selectedProviderDetail?.website && (
          <div className="w-fit flex items-center justify-start gap-2 text-neutral-500">
            <HugeiconsIcon
              icon={Link01StrokeRounded}
              color="currentColor"
              strokeWidth={1.2}
              className="size-5 md:size-6 shrink-0"
            />
            <p className="text-base text-wrap text-neutral-500">
              {selectedProviderDetail?.website ?? "undefined"}
            </p>
          </div>
        )}
        {/* Provider Info Phone */}
        {selectedProviderDetail?.phoneNumber &&
          selectedProviderDetail.phoneNumber.length > 0 && (
            <div className="w-fit flex items-center justify-start gap-2 text-neutral-500">
              <HugeiconsIcon
                icon={Calling02Icon}
                color="currentColor"
                strokeWidth={1.2}
                className="size-5 md:size-6 shrink-0"
              />
              <p className="text-base text-wrap text-neutral-500">
                {formatPhoneNumber(
                  selectedProviderDetail.phoneNumber[0].phoneNumber
                )}
              </p>
            </div>
          )}
        {/* Provider Social Media */}
        {selectedProviderDetail?.socialMedia &&
          selectedProviderDetail.socialMedia.length > 0 && (
            <SocialMediaSection providers={selectedProviderDetail} />
          )}
      </div>
      {/* Provider Detail Action And Map */}
      <div className="w-[100%] lg:w-[40%] flex flex-col items-end justify-start gap-4">
        {/* Provider Action for larger screen */}
        <ProviderAction 
          className="hidden lg:flex -mt-[10px]" 
          isSelected={isSelected}
          onSave={savedProviders}
        />
        {/* Map Container */}
        {selectedProviderDetail && (
          <div className="rounded-xl w-full overflow-hidden z-0 h-[13rem]">
            <ContainerMap 
              markers={selectedProviderDetail}
              isContainer={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderInfo;
