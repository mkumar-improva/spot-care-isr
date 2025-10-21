"use client";

import React, { useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Config } from "@/constants/config";
import useSearchUiStore from "store/ui/search-ui-store";

// Keep libraries array as a constant outside component to prevent reloading
const GOOGLE_MAPS_LIBRARIES: ("places" | "marker")[] = ["places", "marker"];

interface GoogleMapsProviderProps {
  children: React.ReactNode;
}

const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({ children }) => {
  const { setIsMapLoaded } = useSearchUiStore();

  /*------Start of Google Maps Script Loading------*/
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: Config.KEY.MAP || "",
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  useEffect(() => {
    setIsMapLoaded(isLoaded);
  }, [isLoaded, setIsMapLoaded]);
  /*----------End of Google Maps Script Loading----------*/

  return <>{children}</>;
};

export default GoogleMapsProvider;
