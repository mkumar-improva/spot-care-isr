"use client";

import { useRef, useState } from "react";
import useHeaderUiStore from "store/ui/header-ui-store";
import useSearchUiStore from "store/ui/search-ui-store";
import useLoadingState from "store/loader/loding-state";
import useSearchDataStore from "store/data/search-data-store";
import HeroSearchCustomToast from "@/components/ui/toast/hero-search-custom-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert01Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UseRadiusPopOverProps {
  setCareSearchShowVerticalLine?: React.Dispatch<React.SetStateAction<boolean>>;
  setRadiusSearchShowVerticalLine?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const useRadiusPopOver = ({
  setCareSearchShowVerticalLine,
  setRadiusSearchShowVerticalLine,
}: UseRadiusPopOverProps) => {
  const router = useRouter();

  /*----------Begining of Store Import----------*/
  const { isHomePage } = useHeaderUiStore();
  const { loading, isWishlistLoaded, setLoading } = useLoadingState();
  const {
    radiusValue,
    careTypeValue,
    locationValue,
    storePostalCode,
    setRadiusValue,
  } = useSearchUiStore();
  const { currentLocation, searchCurrentLocation } = useSearchDataStore();
  /*----------End of Store Import----------*/

  /*--Begining of refs----------*/
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  const popoverButtonRef = useRef<HTMLButtonElement | null>(null);
  /*----------End of refs----------*/

  /*----------Begining of state ----------*/
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRadiusOpen, setRadiusOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  /*----------End of state ----------*/

  //Handlers
  const handleSelectLocation = (item: string, close: () => void) => {
    setRadiusValue(item);
    close();
    setHighlightedIndex(-1);
  };

  const onClickCapture = () => {
    setCareSearchShowVerticalLine?.(true);
    setRadiusSearchShowVerticalLine?.(false);
  };

  const SearchOption = () => {
    try {
      setLoading(true);
      const filterData = {
        careType: careTypeValue ?? "",
        lat: searchCurrentLocation?.lat ?? 0,
        lng: searchCurrentLocation?.lng ?? 0,
        page: 1,
        pageSize: 10,
        postalCode: storePostalCode ?? "",
        radius: radiusValue ?? "",
        location: locationValue ?? "",
        filter: "recommended",
        headerType: "services",
        ratingRange: "0-5",
      };

      if (
        !filterData.careType ||
        !filterData.radius ||
        !filterData.postalCode
      ) {
        toast.custom((t) => (
          <HeroSearchCustomToast
            icon={
              <HugeiconsIcon
                icon={Alert01Icon}
                className="size-10 flex-shrink-0"
                style={{ color: "#facc15", width: "2.5rem", height: "2.5rem" }}
                aria-hidden="true"
              />
            }
            description1={`Invalid search parameters`}
            description2={`Care type, radius, and postal code are required to run this search.`}
            toasttype={t}
          />
        ));
        return;
      }
      const queryParams = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filterData).map(([k, v]) => [k, String(v)])
        )
      ).toString();
      router.push(`/list?${queryParams}`);
    } catch (err) {
      console.error("Error in SearchOption:", err);
      toast.custom((t) => (
        <HeroSearchCustomToast
          icon={
            <HugeiconsIcon
              icon={Alert01Icon}
              className="size-10 flex-shrink-0"
              style={{ color: "#facc15", width: "2.5rem", height: "2.5rem" }}
              aria-hidden="true"
            />
          }
          description1={`Invalid search request`}
          description2={`Make sure you have entered a valid State or City`}
          toasttype={t}
        />
      ));
    } finally {
    }
  };

  return {
    isHomePage,
    loading,
    isWishlistLoaded,
    radiusValue,
    isDropdownOpen,
    isRadiusOpen,
    highlightedIndex,
    containerRef,
    optionRefs,
    popoverButtonRef,
    careTypeValue,
    locationValue,
    storePostalCode,
    setIsDropdownOpen,
    setRadiusOpen,
    setRadiusValue,
    setHighlightedIndex,
    handleSelectLocation,
    onClickCapture,
    SearchOption,
  };
};

export default useRadiusPopOver;
