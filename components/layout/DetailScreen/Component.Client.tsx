"use client";

import ImageGallery from "@/components/layout/DetailScreen/components/ImageGallery/image-gallery";
import ReviewSummary from "@/components/layout/DetailScreen/components/GoogleReview/review-summary";
import Loading from "@/components/ui/Loader/Loading";
import ProviderInfo from "@/components/layout/DetailScreen/components/ProviderInfo/provider-info";
import ConsultingTab from "@/components/layout/DetailScreen/components/ConsultingTab/ConsultingTab";
import RatingSection from "@/components/layout/DetailScreen/components/CMSRatings/cms-rating";
import FactsSection from "@/components/layout/DetailScreen/components/Facts/facts-and-features";
import MedicalService from "@/assets/med.png";
import BreadCrumbs from "@/components/ui/BreadCrumbs/bread-crumbs";
import NoRecords from "@/assets/Lottie/NoRecords.json";
import Lottie from "lottie-react";
import Heading from "@/components/ui/Heading/Heading";
import { TitleCase } from "@/utils/converter";
import ClaimListingCardV2 from "@/components/ui/ClaimListingCard/claim-listing-card";
import { PermissionGuard } from "components/ui/PermissionGuard";
import { Providers } from "@/types/provider-details";
import { useRef, useEffect } from "react";
import useUIStore from "@/store/detailscreen/ui-store";
import careTypePresent from "@/utils/care-type-present";
import useSearchDataStore from "@/store/data/search-data-store";

interface DetailScreenProps {
  code?: string;
  latitude?: string;
  longitude?: string;
  distance?: string;
  initialProvider?: Providers | null;
  error?: string | null;
}

export default function DetailScreen({
  code,
  latitude,
  longitude,
  distance,
  initialProvider,
  error,
}: DetailScreenProps) {
  const ReviewContainerRef = useRef<HTMLDivElement>(null);
  const CmsContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    if (ReviewContainerRef.current) {
      const offsetTop =
        ReviewContainerRef.current.getBoundingClientRect().top + window.scrollY;
      const customOffset = 100;
      window.scrollTo({
        top: offsetTop - customOffset,
        behavior: "smooth",
      });
    }
  };
  const handleCmsScrollDown = () => {
    if (CmsContainerRef.current) {
      const offsetTop =
        CmsContainerRef.current.getBoundingClientRect().top + window.scrollY;
      const customOffset = 100;
      window.scrollTo({
        top: offsetTop - customOffset,
        behavior: "smooth",
      });
    }
  };

  if (!initialProvider && !error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  if (error || !initialProvider) {
    return (
      <div className="relative flex flex-col h-[88vh] max-w-full items-center justify-center">
        <div className="w-96 h-96 -mt-32">
          <Lottie animationData={NoRecords} loop={true} />
        </div>
        <Heading
          desc={"Unable to load provider details. Try again later"}
          className="text-center"
        >
          No details available
        </Heading>
      </div>
    );
  }

  const data = initialProvider;

  // Get care types from store to determine service name
  const { careTypes } = useSearchDataStore();
  
  // Calculate service name from provider's services
  const getServiceName = () => {
    if (data?.services && data.services.length > 0) {
      const matchedService = data.services.find((service) =>
        careTypePresent(service, careTypes)
      );
      return matchedService ?? "";
    }
    return "";
  };

  const setSelectedProviderDetail = useUIStore((s) => s.setSelectedProviderDetail);
  const previousProviderRef = useRef<Providers | null>(null);
  useEffect(() => {
    if (
      initialProvider &&
      (previousProviderRef.current?.code !== initialProvider.code)
    ) {
      setSelectedProviderDetail(initialProvider);
      previousProviderRef.current = initialProvider;
    }
  }, [initialProvider, setSelectedProviderDetail]);

  return (
    <div className="ListingDetailPage py-[1rem] md:py-[2rem]">
      <div className="w-full max-w-screen-2xl xl:max-w-screen-2xl mx-auto px-4 xl:px-[1rem] 2xl:px-[2.8rem] ListingDetailPage__content">
        <div className="nc-ListingStayDetailPage flex flex-col gap-[2rem] md:gap-[1rem] xl:px-5">
          <div className="w-full flex flex-col items-start justify-start gap-[1.7rem] md:gap-[1rem]">
            <BreadCrumbs
              serviceName={getServiceName()}
              location={data?.locations?.[0]?.city ?? ""}
              providerName={data?.name?.replace("''", "'") ?? ""}
            />
            <p
              className={`text-[22px] flex sm:hidden font-semibold  leading-[1.75rem] -mt-[.5rem] ${
                data?.images && data.images.length > 0
                  ? "-mb-[.5rem]"
                  : "-mb-[1rem]"
              }`}
            >
              {TitleCase(data?.name?.replace("''", "'") ?? "")}
            </p>
            {data && data.images && data.images.length > 0 && (
              <ImageGallery images={data.images} />
            )}
            <div className="w-full flex-1 flex flex-col items-start justify-start">
              <ProviderInfo
                onScrollDown={handleScrollDown}
                onCmsScrollDown={handleCmsScrollDown}
              />
            </div>
          </div>
          <div className="w-full flex items-start justify-start relative gap-[1rem] flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-[45rem] xl:w-[60rem] 2xl:w-[60rem] flex flex-col items-start justify-start gap-[2rem] md:gap-[1rem]">
              <hr className="block md:hidden w-full mt-[.4rem] md:w-0 border-t border-neutral-200" />
              {data?.isRatingsAvailable && data.rating && (
                <RatingSection
                  rating={data.rating}
                  cmsContainerRef={CmsContainerRef}
                />
              )}
              {data?.isRatingsAvailable && data.rating && (
                <hr className="block md:hidden w-full md:w-0 border-t border-neutral-200 mt-[.3rem]" />
              )}
              {data?.agrReview && (
                <ReviewSummary
                  agrReviews={data.agrReview?.reviews}
                  reviewContainerRef={ReviewContainerRef}
                />
              )}
              {data?.agrReview && (
                <hr
                  className={`block md:hidden w-full md:w-0 border-t border-neutral-200 ${
                    !data?.agrReview ? "mt-[.6rem]" : "mt-[.5rem]"
                  }`}
                />
              )}
              {!data?.claimStatus && (
                <PermissionGuard siteKey="provider.claimbusiness">
                  <div className="w-full block lg:hidden  border border-transparent md:border-neutral-200 px-[0] md:px-[2rem] py-[0rem] pb-[.2rem] md:py-[2rem] lg:py-[1.5rem] rounded-xl lg:sticky top-[6rem]">
                    <ClaimListingCardV2 providerCode={data?.code ?? ""} />
                  </div>
                </PermissionGuard>
              )}
              {data && (
                <div className="w-full lg:w-[45rem] xl:w-[60rem] 2xl:w-[60rem] border border-transparent md:border-neutral-200 px-0 md:px-[2rem] md:pb-[1.65rem] md:pt-[1.65rem] rounded-2xl flex flex-col items-start gap-[1rem]">
                  <h2 className="text-2xl font-semibold">Facts & Features</h2>
                  {Array.isArray(data.sections) && data.sections.length > 0 ? (
                    <FactsSection
                      facts={(data.sections || []).filter(
                        (e) => e.sectionName?.trim() !== ""
                      )}
                    />
                  ) : (
                    <span className="text-base text-neutral-500 dark:text-neutral-400">
                      This provider has not provided any additional information.
                      Please contact them directly to inform them of their missing
                      information and to learn more about their services.
                    </span>
                  )}
                </div>
              )}
              {data &&
                Array.isArray(data.sections) &&
                data.sections.length > 0 && (
                  <hr
                    className={`block md:hidden w-full md:w-0 border-t border-neutral-200 ${
                      data.sections.length > 0 ? "mt-0" : "mt-[.5rem]"
                    }`}
                  />
                )}
              <div className="w-full block lg:hidden  border border-transparent md:border-neutral-200 px-[0] md:px-[2rem] py-[0rem] pb-[.2rem] md:py-[2rem] lg:py-[1.5rem] rounded-xl lg:sticky top-[6rem]">
                <ConsultingTab />
              </div>
            </div>
            <div className="hidden lg:flex flex-col w-full gap-4 lg:sticky top-[6rem]">
              {!data?.claimStatus && (
                <PermissionGuard siteKey="provider.claimbusiness">
                  <ClaimListingCardV2 providerCode={data?.code ?? ""} />
                </PermissionGuard>
              )}
              <div className="w-full  border border-transparent md:border-neutral-200 px-[0] md:px-[2rem] py-[1rem] md:pb-[2rem] md:pt-[1.65rem] rounded-xl  bg-white">
                <ConsultingTab />
              </div>
              <img src={MedicalService.src} className="rounded-xl" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}