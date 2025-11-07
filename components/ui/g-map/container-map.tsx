import GMapComponent from "./g-map-component";
import { Config } from "constants/config";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import useThemeStore from "@/store/detailscreen/theme-store";
import { darkMap } from "./dark";
import { lightMap } from "@/data/light-map";
import { Providers } from "types/provider-details";
import useSearchUiStore from "@/store/ui/search-ui-store";
import Lottie from "lottie-react";
import MapLoaderAnimation from "@/assets/Lottie/MapLoading.json";

interface ContainerMapProps {
  markers: Providers;
  isContainer?: boolean;
  latLng?: { lat: number; lng: number };
}

export const ContainerMap: React.FC<ContainerMapProps> = ({
  markers,
  isContainer = false,
  latLng,
}) => {
  //state
  const [map, setMap] = useState<google.maps.Map>();
  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngBounds | null>(null);

  //store
  const { isMapLoaded } = useSearchUiStore();

  //handlers
  useEffect(() => {
    if (map) {
      map.setOptions({ styles: lightMap });
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      if (markers) {
        bounds.extend(
          new google.maps.LatLng(
            markers.locations[0].latitude,
            markers.locations[0].longitude
          )
        );
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
  }, [markers, map]);

  if (!isMapLoaded) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="size-80 lg:size-64 lg:ml-[9rem]">
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
  }

  return (
    <>
      <GoogleMapReact
        defaultZoom={15}
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
        <GMapComponent
          lat={markers.locations[0].latitude}
          lng={markers.locations[0].longitude}
          key={markers.code}
          item={markers}
          isList={false}
        />
      </GoogleMapReact>
    </>
  );
};
