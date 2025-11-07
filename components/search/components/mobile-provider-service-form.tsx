"use client";
import LocationInput from "./location-input";
import ProviderTypeInput from "./provider-type-input";
import useProviderSearchForm from "@/hooks/search/use-provider-search-form";
import ProviderSearchDropdown from "./provider-search-dropdown";

const MobileProviderServiceForm = () => {
  const {
    searchProviderName,
    providerNameDebounce,
    providerIsRecord,
    providerNameError,
    providerInputFocused,
    navigatingCode,
    handleOnClick,
    handleProviderInputFocus,
    handleProviderInputBlur,
  } = useProviderSearchForm();
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
            handleProviderInputFocus={handleProviderInputFocus}
            handleProviderInputBlur={handleProviderInputBlur}
          />
        </div>
        <ProviderSearchDropdown
          searchProviderName={searchProviderName}
          providerNameError={providerNameError}
          providerIsRecord={providerIsRecord}
          providerNameDebounce={providerNameDebounce}
          providerInputFocused={providerInputFocused}
          navigatingCode={navigatingCode}
          handleOnClick={handleOnClick}
        />
      </div>
    </div>
  );
};

export default MobileProviderServiceForm;
