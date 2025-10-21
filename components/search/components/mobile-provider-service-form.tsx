"use client";
import LocationInput from "./location-input";
import ProviderTypeInput from "./provider-type-input";

const MobileProviderServiceForm = () => {
  return (
    <div className="relative z-50 transition-opacity animate-[myblur_0.4s_ease-in-out] w-full px-0 sm:px-10">
      <div className="w-full flex flex-col items-start justify-start gap-7 xsm:gap-14">
        <LocationInput
          className="w-full"
          mobileClassName={"py-[.75rem] nc-hero-field-focused"}
          isFromMobileSearch={true}
        />
        <div className="w-full px-5 sm:px-0 relative">
          <ProviderTypeInput
            mobileClassName={"py-[.75rem] nc-hero-field-focused"}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileProviderServiceForm;
