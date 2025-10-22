import { EndpointConstants } from "@/constants/end-point-constants";
import { END_POINT } from "./end-point";
import { CareResponse } from "@/types/care-types";
import { mapToType, mapListToType } from "@/utils/mapper";
import handleError from "@/utils/handleError";
import { Providers } from "@/types/provider-details";
import { IpInfo } from "@/types/ip-info";

export const Services = {
  LoadCareTypes: async () => {
    try {
      let result = await END_POINT.get(EndpointConstants.MsAllCategories);
      let data: CareResponse = mapToType<CareResponse>(result["data"]);
      let cares = data.data;
      let siteSettings = data.siteSettings;

      cares = cares.sort((a, b) => a.name.localeCompare(b.name));

      return { cares, siteSettings };
    } catch (err) {
      handleError(err, "GetProvider");
    }
  },
  SearchByProviderName: async (
    searchVal: string,
    limit: number,
    page: number = 1,
    isList: boolean = false,
    lat: number,
    lng: number
  ) => {
    try {
      const result = await END_POINT.get(
        EndpointConstants.SearchByProviderName +
          `/${searchVal}/${limit}/${page}/${isList}/${lat}/${lng}`
      );
      const data = mapListToType<Providers>(result?.data?.data ?? []);
      return data;
    } catch (error) {
      handleError(error, "SearchByProviderName");
    }
  },
  GetIPAddress: async () => {
    try {
      const result = await END_POINT.getIpAddress();
      if (result) {
        return mapToType<IpInfo>(result);
      }
      return null;
    } catch (error) {
      handleError(error, "Failed to fetch live location");
    }
  },
  LoadCaresForHomeScreen: async (
    latitude: number,
    longitude: number,
    pageSize: number = 100,
    radius: number = 20
  ) => {
    try {
      let result = await END_POINT.get(EndpointConstants.MsProvidersDetailV2, {
        radius: radius,
        lat: latitude || 40.7127753,
        lon: longitude || -74.0059728,
        careType: "Skilled Nursing",
        page: 1,
        pageSize: pageSize,
      });
      let providersList = mapListToType<Providers>(result["data"] ?? []);
      let uniqueProviders = new Set();
      let filteredProviders = [];
      for (let provider of providersList) {
        if (!uniqueProviders.has(provider.name)) {
          uniqueProviders.add(provider.name);
          filteredProviders.push(provider);
        }
      }
      return { data: filteredProviders, total: result["total"] };
    } catch (error) {
      handleError(error, "LoadCaresForHomeScreen");
    }
  },
};
