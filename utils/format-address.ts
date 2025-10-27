import {Address} from "@/types/provider-details"

export const formatAddressFromLocations = (locations: Address[]): string => {
  if (!Array.isArray(locations) || locations.length === 0) return "";

  const location = locations[0];

  const rawAddress = location?.address?.split(",") || [];
  const street = rawAddress[0]?.trim();
  const addressLine2 = rawAddress[1]?.trim();
  const city = location?.city?.trim();
  const state = location?.state?.trim();
  const postalCode = location?.postalCode?.split("-")[0]?.trim();

  const addressParts = [street, addressLine2, city, state].filter(Boolean);

  const formattedAddress =
    addressParts.join(", ") + (postalCode ? ` - ${postalCode}` : "");

  return formattedAddress;
};