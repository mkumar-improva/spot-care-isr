"use client";

import { useState, useEffect, useRef } from "react";
import { Services } from "@/services/service";
import { Providers, QnaResponse, Section } from "@/types/provider-details";
import { getDistanceFromLatLon } from "@/utils/distance-finder";
import { Cares } from "@/types/care-types";

interface UseProviderDetailProps {
  code: string | null;
  latitude: string | null;
  longitude: string | null;
  distanceInMilesParam: string | null;
  defaultLatitude: number;
  defaultLongitude: number;
  careTypes: Cares[];
  filterSections: (sections: Section[]) => Section[];
  parseProvider: (provider: Providers, distance: number) => Providers;
}

const useProviderDetail = ({
  code,
  latitude,
  longitude,
  distanceInMilesParam,
  defaultLatitude,
  defaultLongitude,
  careTypes,
  filterSections,
  parseProvider,
}: UseProviderDetailProps) => {
  const [data, setData] = useState<Providers>();
  const [loading, setLoading] = useState(false);
  const [isRecordNotFound, setIsRecordNotFound] = useState(false);
  const ReviewContainerRef = useRef<HTMLDivElement>(null);
  const CmsContainerRef = useRef<HTMLDivElement>(null);

  const fetchData = async (providerCode: string) => {
    setLoading(true);
    setIsRecordNotFound(false);
    try {
      let distanceInMiles: number;
      const response = await Services.GetProvider(providerCode);
      // console.log("Provider Response:", response);
      
      if (response && response.code) {
        if (!distanceInMilesParam || distanceInMilesParam === "0") {
          const userLatitude = latitude ?? String(defaultLatitude);
          const userLongitude = longitude ?? String(defaultLongitude);

          distanceInMiles = getDistanceFromLatLon(
            Number(userLatitude),
            Number(userLongitude),
            response.locations[0].latitude,
            response.locations[0].longitude
          );
        } else {
          distanceInMiles = Number(distanceInMilesParam);
        }
        
        let parsedvalue = parseProvider(response, Number(distanceInMiles));
        const qnaResponse: QnaResponse | undefined = await Services.LoadQnA(response.code);
        if (qnaResponse) {
          parsedvalue.claimStatus = qnaResponse.claimStatus;
          let result: Section[] = filterSections(qnaResponse.sections);
          parsedvalue.sections = result;
        }
        setData(parsedvalue);
      } else {
        setIsRecordNotFound(true);
      }
    } catch (error) {
      setIsRecordNotFound(true);
      console.error("Error fetching provider data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      fetchData(code);
    }
  }, [code]);

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

  return {
    data,
    loading,
    isRecordNotFound,
    ReviewContainerRef,
    CmsContainerRef,
    handleScrollDown,
    handleCmsScrollDown,
  };
};

export default useProviderDetail;
