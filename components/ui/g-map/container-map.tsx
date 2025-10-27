import GMapComponent from "./g-map-component";
import { Config } from "constants/config";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import useThemeStore from "@/store/detailscreen/theme-store";
import { darkMap } from "./dark";
import { lightMap } from "./light";
import { Providers } from "types/provider-details";

interface ContainerMapProps {
  markers: Providers;
  isContainer?: boolean;
}

export const ContainerMap: React.FC<ContainerMapProps> = ({
  markers,
  isContainer = false
}) => {
  const [map, setMap] = useState<google.maps.Map>();
  const { theme } = useThemeStore();

  useEffect(() => {
    if (map) {
      map.setOptions({ styles: theme === "dark" ? darkMap : lightMap });
    }
  }, [theme]);

  useEffect(() => {
    if (map) {
      map.setOptions({ styles: theme === "dark" ? darkMap : lightMap });
    }
  }, [map]);

  return (
    <GoogleMapReact
      defaultZoom={isContainer ? 15 : 14}
      defaultCenter={{
        lat: markers.locations[0].latitude,
        lng: markers.locations[0].longitude
      }}
      bootstrapURLKeys={{
        key: Config.KEY.MAP
      }}
      yesIWantToUseGoogleMapApiInternals
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: isContainer,
        zoomControl: false
      }}
      onGoogleApiLoaded={({ map }) => setMap(map)}
    >
      <GMapComponent
        lat={markers.locations[0].latitude}
        lng={markers.locations[0].longitude}
        key={markers.code}
        item={markers}
        isList={false}
      />
    </GoogleMapReact>
  );
};
