import { EndpointConstants } from "@/constants/end-point-constants";
import { END_POINT } from "./end-point";
import { CareResponse } from "@/types/care-types";
import { mapToType, mapListToType } from "@/utils/mapper";
import handleError from "@/utils/handleError";
import { Providers } from "@/types/provider-details";
import { Config } from "@/constants/config";

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
};
