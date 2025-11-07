import { Providers } from "./provider-details";

export type WishlistType = {
  id: number;
  customerId: number;
  providercode: string;
  providerId: number;
  serviceTag: string;
  provider: Providers;
};
