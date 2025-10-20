import CareTypeInput from "./care-type-input";
import LocationInput from "./location-input";
import RadiusInput from "./radius-input";

const MobileSearchServiceForm = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-start gap-7 xsm:gap-14">
      <div className="transition-opacity animate-[myblur_0.4s_ease-in-out] w-full px-5 sm:px-10">
        <CareTypeInput
          className="flex-1"
          mobileClassName={"nc-hero-field-focused"}
        />
      </div>
      <div className="transition-opacity animate-[myblur_0.4s_ease-in-out] w-full sm:px-10">
        <LocationInput
          className="flex-1 "
          mobileClassName={"py-[.75rem] nc-hero-field-focused"}
          isFromMobileSearch={true}
        />
      </div>
      <div className="transition-opacity animate-[myblur_0.4s_ease-in-out] w-full px-5 sm:px-10">
        <RadiusInput
          className={`flex-1`}
          mobileClassName={"nc-hero-field-focused"}
        />
      </div>
    </div>
  );
};

export default MobileSearchServiceForm;
