import { EndpointConstants } from "@/constants/end-point-constants";
import { END_POINT } from "./end-point";
import { Config } from "@/constants/config";
import { CareResponse } from "@/types/care-types";
import { mapToType, mapListToType, mapToBaseResponse } from "@/utils/mapper";
import handleError from "@/utils/handleError";
import { Providers, QnaResponse } from "@/types/provider-details";
import { IpInfo } from "@/types/ip-info";
import { AddWishlist } from "@/types/add-wish-list";
import { ContactTypes } from "@/types/contact-types";
import { UserData } from "@/types/user-data";
import { Filters } from "@/types/filter-props";
import { WishlistType } from "@/types/wishlist-type";

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
  AddWishlist: async (wishlistBody: AddWishlist) => {
    try {
      const result = await END_POINT.post(
        EndpointConstants.AddWishlist,
        {
          customerId: wishlistBody.customerId,
          providerId: wishlistBody.providerId,
          providercode: wishlistBody.providercode,
          serviceTag: wishlistBody.serviceTag,
        },
        true
      );
      return result;
    } catch (error) {
      handleError(error, "AddWishlist");
    }
  },
  DeleteWishlist: async (providerCode: string, customerId: number) => {
    try {
      const result = await END_POINT.get(
        EndpointConstants.DeleteWishlist +
          `?providerCode=${providerCode}&customerId=${customerId}`
      );
      return result;
    } catch (error) {
      handleError(error, "DeleteWishlist");
    }
  },
  CreateContact: async (contactMessage: ContactTypes) => {
    try {
      const result = await END_POINT.post(
        EndpointConstants.CreateContactMessage,
        {
          fullName: contactMessage.fullName,
          email: contactMessage.email,
          message: contactMessage.message,
        },
        true
      );
      return result;
    } catch (error) {
      handleError(error, "CreateContact");
    }
  },
  GetProvider: async (code: string) => {
    try {
      const result = await END_POINT.get(
        EndpointConstants.GetProvider + `/${code}`
      );
      let providerList = mapToType<Providers>(result["data"] ?? []);
      return providerList;
    } catch (error) {
      handleError(error, "GetProvider");
    }
  },
  LoadQnA: async (providerId: string) => {
    try {
      const result = await END_POINT.get(
        EndpointConstants.MsProviderWithQA + providerId
      );
      return mapToType<QnaResponse>(result["data"] ?? {});
    } catch (error) {
      handleError(error, "LoadQnA");
    }
  },
  GetReportOptions: async () => {
    try {
      const result = await END_POINT.get(EndpointConstants.GetReportOptions);
      return result;
    } catch (error) {
      handleError(error, "GetReportOptions");
    }
  },
  Register: async (
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string
  ) => {
    try {
      const result = await END_POINT.post(
        EndpointConstants.Register,
        {
          firstName,
          lastName,
          phone,
          email,
          password,
        },
        true
      );
      let data = mapToBaseResponse<any>(result);
      return data;
    } catch (error) {
      handleError(error, "Register");
    }
  },
  Verify: async (otp: string, email: string) => {
    try {
      const result = await END_POINT.post(
        EndpointConstants.Verify,
        { otp, email },
        true
      );
      let data = mapToBaseResponse<any>(result);
      return data;
    } catch (error) {
      handleError(error, "Verify");
    }
  },
  RetryVerification: async (email: string) => {
    try {
      const result = await END_POINT.post(
        EndpointConstants.RetryVerification,
        { email },
        true
      );
      let data = mapToBaseResponse<any>(result);
      return data;
    } catch (error) {
      handleError(error, "RetryVerification");
    }
  },
  ForgotPassword: async (email: string) => {
    try {
      const result = await END_POINT.post(
        EndpointConstants.ForgotPassword,
        { email },
        true
      );
      let data = mapToBaseResponse<any>(result);
      return data;
    } catch (error) {
      handleError(error, "ForgotPassword");
    }
  },
  ResetPassword: async (newPassword: string, token: string) => {
    try {
      const result = await END_POINT.post(
        EndpointConstants.ResetPassword,
        { newPassword, token },
        true
      );
      let data = mapToBaseResponse<any>(result);
      return data;
    } catch (error) {
      handleError(error, "ResetPassword");
    }
  },
  Login: async (email: string, password: string) => {
    try {
      const result = await END_POINT.post(
        EndpointConstants.Login,
        { email, password },
        true
      );
      let data = mapToBaseResponse<UserData>(result);
      return data;
    } catch (error) {
      handleError(error, "Login");
    }
  },

  updateProfile: async (
    blob: Blob | null,
    firstName: string,
    lastName: string,
    phone: string,
    email: string
  ) => {
    try {
      const formData = new FormData();
      if (blob instanceof Blob) {
        // Backend expects the file under key "file" (legacy behavior)
        formData.append("file", blob, "profile.png");
      }

      formData.append("email", email);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);

      const result = await END_POINT.postFormData(
        EndpointConstants.UpdateProfile,
        formData
      );
      let data = mapToBaseResponse<UserData>(result);
      return data;
    } catch (error) {
      handleError(error, "updateProfile");
    }
  },

  RemoveProfilePicture: async (email: string) => {
    try {
      // Legacy service uses GET with query param
      const result = await END_POINT.get(
        EndpointConstants.RemoveProfilePicture + `?email=${email}`
      );
      let data = mapToBaseResponse<any>(result);
      return data;
    } catch (error) {
      handleError(error, "RemoveProfilePicture");
    }
  },

  ChangePassword: async (
    token: string,
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      // Align with existing service: send token in body via endpoint helper
      const result = await END_POINT.post(
        EndpointConstants.ChangePassword,
        { token: token, oldPassword: oldPassword, newPassword: newPassword },
        true
      );
      const data = mapToBaseResponse<unknown>(result);
      return data;
    } catch (error) {
      handleError(error, "ChangePassword");
    }
  },

  GetUserByEmail: async (email: string) => {
    try {
      const result = await END_POINT.get(
        EndpointConstants.GetUserByEmail + `?email=${email}`
      );
      let data = mapToBaseResponse<UserData>(result);
      return data;
    } catch (error) {
      handleError(error, "GetUserByEmail");
    }
  },
  LoadCaresAgainstFilters: async (filter: Filters) => {
    try {
      const params = {
        radius: filter.radius.split(" ")[0],
        lat: filter.lat,
        lon: filter.lon,
        careType: filter.careType,
        page: 1,
        pageSize: 1000,
      };

      const result = await END_POINT.get(
        EndpointConstants.MsProvidersDetailV2,
        params
      );
      const providersList = mapListToType<Providers>(result["data"] ?? []);
      let uniqueProviders = new Set();
      let filteredProviders = [];
      for (let provider of providersList) {
        const providerKey = `${provider.name}-${JSON.stringify(
          provider.locations
        )}`;
        if (!uniqueProviders.has(providerKey)) {
          uniqueProviders.add(providerKey);
          filteredProviders.push(provider);
        }
        // if (!uniqueProviders.has(provider.name)) {
        //     uniqueProviders.add(provider.name);
        //     filteredProviders.push(provider);
        // }
      }
      return { data: filteredProviders, total: result["total"] };
    } catch (error) {
      handleError(error, "LoadCaresAgainstFilters");
      return { data: [], total: 0 };
    }
  },
  SearchByProviderNameList: async (filter: Filters) => {
    try {
      let lng = filter.lon;
      let result = await END_POINT.get(
        EndpointConstants.SearchByProviderName +
          `/${filter.searchText}/${filter.pageSize}/1/true/${filter.lat}/${lng}`
      );
      let searchProviderList = mapListToType<Providers>(
        result?.data?.data ?? []
      );
      let uniqueProviders = new Set();
      let filteredProviders = [];
      for (let provider of searchProviderList) {
        const providerKey = `${provider.name}-${JSON.stringify(
          provider.locations
        )}`;
        if (!uniqueProviders.has(providerKey)) {
          uniqueProviders.add(providerKey);
          filteredProviders.push(provider);
        }
      }
      return { data: filteredProviders, total: result.data.total };
    } catch (error) {
      handleError(error, "SearchByProviderNameList");
      return { data: [], total: 0 };
    }
  },
  GetWishlist: async (customerId: number) => {
    try {
      const result = await END_POINT.get(
        EndpointConstants.GetWishlist + `?customerId=${customerId}`
      );
      let data = mapListToType<WishlistType>(result["data"] ?? []);
      return data;
    } catch (error) {
      handleError(error, "GetWishlist");
    }
  },
  SendEmail: async (
    blob: Blob,
    emailId: string,
    firstname: string,
    lastname: string
  ) => {
    const formData = new FormData();
    formData.append("file", blob, "Spot Care Providers.pdf");
    formData.append("email", emailId);
    formData.append("firstName", firstname);
    formData.append("lastname", lastname);
    try {
      let result = await END_POINT.postFormData(
        EndpointConstants.SendEmail,
        formData
      );
      return result;
    } catch (error) {
      handleError(error, "SendEmail");
    }
  },
  SaveReport: async (code: string, categoryId: number, desc: string) => {
    try {
      let result = await END_POINT.post(
        EndpointConstants.SaveReport,
        {
          code: code,
          categoryId: categoryId,
          desc: desc,
        },
        true
      );
      return result;
    } catch (error) {
      handleError(error, "SaveReport");
    }
  },
};
