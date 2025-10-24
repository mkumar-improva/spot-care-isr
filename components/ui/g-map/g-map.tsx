"use client";

import { useEffect, useState, FC } from "react";
import GoogleMapReact from "google-map-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Navigation06Icon } from "@hugeicons-pro/core-solid-sharp/index";
import Lottie from "lottie-react";
import MapLoaderAnimation from "@/assets/Lottie/MapLoading.json";
import { Providers } from "@/types/provider-details";
import useSearchUiStore from "@/store/ui/search-ui-store";
import { lightMap } from "@/data/light-map";
import { Config } from "@/constants/config";
import GMapComponent from "./g-map-component";

interface GMapProps {
  paginatedList: Providers[];
  selectedId: string | number;
  latLng?: { lat: number; lng: number };
  recenterClassName?: string;
}

const GMap: FC<GMapProps> = ({
  paginatedList,
  selectedId,
  latLng,
  recenterClassName,
}) => {
  //state
  const [map, setMap] = useState<google.maps.Map>();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngBounds | null>(null);

  //store
  const { isMapLoaded } = useSearchUiStore();

  //handlers
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (map) {
      map.setOptions({ styles: lightMap });
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      if (paginatedList.length > 0) {
        paginatedList.forEach((coord: Providers) => {
          bounds.extend(
            new google.maps.LatLng(
              coord.locations[0].latitude,
              coord.locations[0].longitude
            )
          );
        });
        map.fitBounds(bounds);
        setInitialBounds(bounds);

        const currentZoom = map.getZoom();
        if (currentZoom) {
          map.setZoom(currentZoom - 1); // Optional
        }
      } else if (latLng && latLng.lat != null && latLng.lng != null) {
        const center = new google.maps.LatLng(latLng.lat, latLng.lng);
        map.setCenter(center);
        map.setZoom(13);
        return;
      }

      map.setOptions({
        draggable: true,
        zoomControl: false,
        scrollwheel: true,
        disableDoubleClickZoom: false,
      });
    }
  }, [paginatedList, map, windowWidth]);

  const handleRecenter = () => {
    if (initialBounds && map) {
      map.fitBounds(initialBounds);
    }
  };

  if (!isMapLoaded)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-96 h-96 mt-32 ml-[3rem]">
          <Lottie animationData={MapLoaderAnimation} loop={true} />
          <p className="text-center font-medium text-lg flex justify-center items-center gap-1">
            Loading
            <span className="dot-bounce animation-delay-0">.</span>
            <span className="dot-bounce animation-delay-200">.</span>
            <span className="dot-bounce animation-delay-400">.</span>
          </p>
        </div>
      </div>
    );

  return (
    <>
      <GoogleMapReact
        defaultZoom={13}
        defaultCenter={{ lat: 40.7127753, lng: -74.0059728 }}
        bootstrapURLKeys={{
          key: Config.KEY.MAP,
        }}
        onGoogleApiLoaded={({ map }) => setMap(map)}
        yesIWantToUseGoogleMapApiInternals
        options={{
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: false,
          clickableIcons: false,
        }}
      >
        {paginatedList.map((item) => (
          <GMapComponent
            isSelected={selectedId === item.code}
            lat={item.locations[0].latitude}
            lng={item.locations[0].longitude}
            key={item.code}
            item={item}
          />
        ))}
      </GoogleMapReact>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-4">
        <button
          className={`bg-white gap-1.5  px-4 py-2
          text-neutral-700 rounded-full cursor-pointer flex items-center hover:bg-neutral-50 text-sm font-[500] tracking-[1px]
          justify-center ${recenterClassName}`}
          onClick={handleRecenter}
        >
          <HugeiconsIcon
            icon={Navigation06Icon}
            className="size-4"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          Re-center
        </button>
      </div>
    </>
  );
};

export default GMap;
