"use client";
import { IpInfo } from "@/types/ip-info";
import { FC, useEffect, useState } from "react";
import { Services } from "@/services/service";
import { HomeScreenData } from "@/components/data/client-store-initializer";
import ClientStoreInitializerProps from "@/components/data/client-store-initializer";
import { CareTypes } from "@/types/care-types";
import useLoadingState from "@/store/loader/loding-state";
import useCommonUiStore from "@/store/ui/common-ui-store";
import { LocationHelper } from "@/utils/auth-helper";

interface UseHomeScreenProps {
  careTypes: CareTypes[];
}

const UseHomeScreen: FC<UseHomeScreenProps> = ({ careTypes }) => {
  //store
  const { setLoading } = useLoadingState();
  const { setLatLng } = useCommonUiStore();

  //state management
  const [fetchedLocationInfo, setFetchedLocationInfo] = useState<IpInfo | null>(
    null
  );
  const [homeScreenData, setHomeScreenData] = useState<HomeScreenData | null>(
    null
  );

  useEffect(() => {
    getIpAddress();
  }, []);

  const getIpAddress = async () => {
    try {
      const ipInfo = await Services.GetIPAddress();
      if (ipInfo) {
        setFetchedLocationInfo(ipInfo);
        // Call LoadeHomeScreenList with the ipInfo directly
        await LoadeHomeScreenList(ipInfo);
      }
    } catch (err) {
      // If IP address fetch fails, call with null to use fallback
      await LoadeHomeScreenList(null);
    }
  };

  const LoadeHomeScreenList = async (ipInfo: IpInfo | null = null) => {
    try {
      const currentLocationionInfo = ipInfo || fetchedLocationInfo;
      if (!currentLocationionInfo) return;
      const isUS = currentLocationionInfo.location.country === "United States";
      const lat = isUS ? currentLocationionInfo?.location?.latitude : undefined;
      const lon = isUS
        ? currentLocationionInfo?.location?.longitude
        : undefined;
      const city = isUS ? currentLocationionInfo?.location?.city : undefined;
      const postal = isUS ? currentLocationionInfo?.location?.zip : undefined;
      const fallbackLat = 40.7127753;
      const fallbackLon = -74.0059728;
      const fallbackCity = "New York";
      const hasValidCoords = typeof lat === "number" && typeof lon === "number";
      const liveRequest = hasValidCoords
        ? Services.LoadCaresForHomeScreen(lat, lon, 25, 30)
        : Promise.resolve({ total: 0, data: [] });

      const fallbackRequest = Services.LoadCaresForHomeScreen(
        fallbackLat,
        fallbackLon,
        25,
        10
      );

      //api call data handling
      const [liveResponse, fallbackResponse] = await Promise.all([
        liveRequest,
        fallbackRequest,
      ]);
      if (liveResponse && liveResponse.total > 0) {
        const homeData: HomeScreenData = {
          providers: liveResponse.data,
          total: liveResponse.total,
          location: { lat: lat!, lon: lon!, city: city || "New York" },
          isUSLocation: true,
        };
        setLatLng({ lat: lat!, lng: lon! });
        LocationHelper.saveLocation(lat!.toString(), lon!.toString());
        setHomeScreenData(homeData);
        return;
      } else {
        const homeData: HomeScreenData = {
          providers: fallbackResponse?.data || [],
          total: fallbackResponse?.total || 0,
          location: { lat: fallbackLat, lon: fallbackLon, city: fallbackCity },
          isUSLocation: false,
        };
        setLatLng({ lat: fallbackLat, lng: fallbackLon });
        LocationHelper.saveLocation(
          fallbackLat.toString(),
          fallbackLon.toString()
        );
        setHomeScreenData(homeData);
        return;
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientStoreInitializerProps
      careTypes={careTypes}
      ipInfo={fetchedLocationInfo || null}
      homeScreenData={homeScreenData || null}
    />
  );
};

export default UseHomeScreen;
