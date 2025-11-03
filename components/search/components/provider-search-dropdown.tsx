"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon } from "@hugeicons-pro/core-stroke-standard/index";
import { Providers } from "@/types/provider-details";
import { Config } from "@/constants/config";

interface ProviderSearchDropdownProps {
  searchProviderName: string;
  providerNameError: boolean;
  providerIsRecord: boolean;
  providerNameDebounce: Providers[] | null;
  providerInputFocused: boolean;
  handleOnClick: (
    code: string,
    distance: number,
    providerName?: string
  ) => void;
}

const ProviderSearchDropdown = ({
  searchProviderName,
  providerNameError,
  providerIsRecord,
  providerNameDebounce,
  providerInputFocused,
  handleOnClick,
}: ProviderSearchDropdownProps) => {
  if (!providerInputFocused || searchProviderName.trim() === "") {
    return null;
  }

  return (
    <div
      className="absolute left-0 top-full z-40 mt-3 w-full rounded-2xl bg-white 
           shadow-xl ring-1 ring-neutral-100 flex flex-col 
           items-start justify-start overflow-auto max-h-[17rem] px-4 py-2 gap-2"
    >
      {providerNameError ? (
        <ErrorState />
      ) : providerIsRecord ? (
        <LoadingState />
      ) : providerNameDebounce && providerNameDebounce.length > 0 ? (
        <ProviderList
          providers={providerNameDebounce}
          onProviderClick={handleOnClick}
        />
      ) : (
        <NoRecordsState />
      )}
    </div>
  );
};

const ErrorState = () => (
  <div className="w-full flex items-center justify-center py-4 gap-[.25rem]">
    <HugeiconsIcon icon={CancelCircleIcon} className="size-4" />
    <p>Something went wrong</p>
  </div>
);

const NoRecordsState = () => (
  <div className="w-full py-4 flex items-center justify-center">
    <p>No records were found.</p>
  </div>
);

const LoadingState = () => (
  <div className="w-full flex items-center justify-center py-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin lg:h-6 lg:w-6 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  </div>
);

interface ProviderListProps {
  providers: Providers[];
  onProviderClick: (
    code: string,
    distance: number,
    providerName?: string
  ) => void;
}

const ProviderList = ({ providers, onProviderClick }: ProviderListProps) => (
  <>
    {providers.map((provider, index) => (
      <ProviderItem
        key={`${provider.code}-${index}`}
        provider={provider}
        onProviderClick={onProviderClick}
      />
    ))}
  </>
);

interface ProviderItemProps {
  provider: Providers;
  onProviderClick: (
    code: string,
    distance: number,
    providerName?: string
  ) => void;
}

const ProviderItem = ({ provider, onProviderClick }: ProviderItemProps) => {
  const handleClick = () => {
    onProviderClick(
      provider.code,
      provider.distanceInMiles || 0,
      provider.name.replace("''", "'")
    );
  };

  const getProviderImage = () => {
    if (provider.images && provider.images.length > 0) {
      return provider.images[0].imagePath;
    }
    return Config.KEY.DUMMY_IMAGE;
  };

  const getProviderAddress = () => {
    if (provider?.locations && provider.locations.length > 0) {
      const location = provider.locations[0];
      return (
        [location.address, location.city, location.state].join(", ") +
        " - " +
        location.postalCode.split("-")[0]
      );
    }
    return "";
  };

  return (
    <div
      className="flex justify-center items-center px-8 gap-4 hover:bg-neutral-100 hover:rounded-lg w-full cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={getProviderImage()}
        className="w-16 rounded-xl h-12 object-cover"
        alt={`${provider.name} image`}
      />
      <div className="py-[.75rem] w-full">
        <p className="text-gray-500 text-base font-semibold">
          {provider.name.replace("''", "'")}
        </p>
        {provider?.locations && provider.locations.length > 0 && (
          <div className="w-fit flex items-center justify-start gap-2 md:gap-2 text-neutral-500">
            <span className="text-sm text-wrap font-normal text-neutral-500 dark:text-neutral-400">
              {getProviderAddress()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderSearchDropdown;
