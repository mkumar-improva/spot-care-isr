"use client";
import { useState, useRef, useEffect } from "react";
import useSearchUiStore from "store/ui/search-ui-store";
import useSearchDataStore from "store/data/search-data-store";
import { extractAddress, getComponent, fetchPostalCode } from "@/utils/geocode";
import { AddressComponents } from "@/types/location-types";
import { useOutsideAlerter } from "../common/use-outsider-click";
import useCustomToast from "../common/use-custom-toast";
import toast from "react-hot-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert01Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import HeroSearchCustomToast from "@/components/ui/toast/hero-search-custom-toast";

interface useLocationTypeInputProps {
  autofocus: boolean;
  setProviderSearchShowVerticalLine?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setCareSearchShowVerticalLine?: React.Dispatch<React.SetStateAction<boolean>>;
  setRadiusSearchShowVerticalLine?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const useLocationTypeInput = ({
  autofocus,
  setProviderSearchShowVerticalLine,
  setCareSearchShowVerticalLine,
  setRadiusSearchShowVerticalLine,
}: useLocationTypeInputProps) => {
  const { showToast } = useCustomToast();
  /*----------Begining of Store Import----------*/
  const { isMapLoaded, locationValue, setStorePostalCode,setLocationValue } = useSearchUiStore();
  const { setCurrentLocation } = useSearchDataStore();
  /*----------End of Store Import----------*/

  /*--Begining of refs----------*/
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  /*----------End of refs----------*/

  //state
  const [showPopover, setShowPopover] = useState(autofocus);

  //handlers

  //handlers
  useOutsideAlerter(containerRef, () => {
    if (showPopover) setShowPopover(false);
  });

  const handlePlaceChanged = async () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      const lat = place.geometry?.location!.lat() ?? 0;
      const lng = place.geometry?.location!.lng() ?? 0;

      if (lat !== 0 && lng !== 0) setCurrentLocation({ lat: lat, lng: lng });

      if (place.geometry) {
        const address = extractAddress(
          place.formatted_address || place.name || ""
        );
        const components = place.address_components as AddressComponents;
        let postalCode = getComponent(components, "postal_code");

        if (!postalCode && place.geometry.location) {
          postalCode = await fetchPostalCode(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        }

        if (!address) {
          toast.custom((t) => (
            <HeroSearchCustomToast
              icon={
                <HugeiconsIcon
                  icon={Alert01Icon}
                  className="size-10 flex-shrink-0"
                  style={{ color: '#facc15',width:"2.5rem", height:"2.5rem" }}
                  aria-hidden="true"
                />
              }
              description1={`Invalid address`}
              description2={`Make sure you have entered a valid State or City`}
              toasttype={t}
            />
          ));
        }

        setLocationValue(address);
        setStorePostalCode(postalCode);
        setShowPopover(false);
        setCareSearchShowVerticalLine?.(true);
        setRadiusSearchShowVerticalLine?.(true);
        setProviderSearchShowVerticalLine?.(true);
      }
    }
  };

  return {
    isMapLoaded,
    locationValue,
    setLocationValue,
    containerRef,
    inputRef,
    autocompleteRef,
    showPopover,
    setShowPopover,
    handlePlaceChanged,
  };
};

export default useLocationTypeInput;
