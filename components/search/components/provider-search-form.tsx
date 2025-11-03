"use client";

import ProviderTypeInput from "./provider-type-input";
import useProviderSearchForm from "@/hooks/search/use-provider-search-form";
import LocationInput from "./location-input";
import ProviderSearchDropdown from "./provider-search-dropdown";

interface ProviderSearchFormProps {
  onFocusScroll?: () => void;
}
const ProviderSearchForm = ({ onFocusScroll }: ProviderSearchFormProps) => {
  const {
    containerRef,
    isHomePage,
    showVerticalLine,
    searchProviderName,
    providerNameDebounce,
    providerIsRecord,
    providerNameError,
    providerInputFocused,
    setShowVerticalLine,
    handleOnClick,
    handleProviderInputFocus,
    handleProviderInputBlur,
  } = useProviderSearchForm();

  return (
    <div
      ref={containerRef}
      className={`relative z-50 ml-1 lg:mx-auto w-full rounded-full bg-white ${
        isHomePage
          ? "shadow-xl dark:shadow-2xl ring ring-neutral-50"
          : "border border-neutral-200 dark:border-neutral-6000"
      } `}
    >
      <div className="w-full flex items-center justify-start rounded-full bg-white overflow-hidden">
        {/* Location Input */}
        <LocationInput
          className="flex-1"
          setProviderSearchShowVerticalLine={setShowVerticalLine}
          mobileClassName="md:py-[.75rem] lg:py-[1.25rem]"
          onFocusScroll={onFocusScroll}
        />
        <div
          className={`self-center h-8 py-2 border-r ${
            showVerticalLine
              ? "border-slate-200 dark:border-slate-700"
              : "border-transparent"
          }`}
        ></div>
        {/* Provider Type Input */}
        <ProviderTypeInput
          setShowVerticalLine={setShowVerticalLine}
          mobileClassName="md:py-[.75rem] lg:py-[1.25rem]"
          onFocusScroll={onFocusScroll}
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
        handleOnClick={handleOnClick}
      />
    </div>
  );
};

export default ProviderSearchForm;
