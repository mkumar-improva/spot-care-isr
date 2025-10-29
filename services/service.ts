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
      const result = await END_POINT.post(EndpointConstants.AddWishlist, {
        customerId: wishlistBody.customerId,
        providerId: wishlistBody.providerId,
        providercode: wishlistBody.providercode,
        serviceTag: wishlistBody.serviceTag,
      });
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
        }
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
};
