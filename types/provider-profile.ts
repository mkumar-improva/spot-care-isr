import { Providers } from "./provider-details";

export interface AddressType {
  id: number;
  addressTypeName: string;
}

export interface Care {
  name: string;
  careTypes: string[];
}

export interface CareCategory {
  name: string;
  careTypes: string[];
}

export interface ImageType {
  id: number;
  typeName: string;
}

export interface SocialMediaType {
  id: number;
  typeName: string;
}

export interface PhoneType {
  id: number;
  typeName: string;
}

export interface ProviderProfileResponse {
  addressTypes: AddressType[];
  cares: CareCategory[];
  imageTypes: ImageType[];
  phoneTypes: PhoneType[];
  socialMediaTypes: SocialMediaType[];
  provider: Providers
}