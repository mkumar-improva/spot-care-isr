import { Address } from "@/types/provider-details";

export function TitleCase(input: string): string {
  return (
    input
      // Split the string into words using a regular expression that considers spaces and hyphens as delimiters
      .split(/(\s+|-)/g)
      // Map each segment (including spaces and hyphens) to process only letters
      .map((segment) => {
        if (segment.match(/^[a-zA-Z]+$/)) {
          // Capitalize the first letter and make the rest lowercase
          return (
            segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
          );
        } else {
          // Keep spaces and hyphens unchanged
          return segment;
        }
      })
      // Join all segments back into a single string
      .join("")
  );
}

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

export const formatPhoneNumber = (phoneNumber: string) => {
  // Remove any non-digit characters
  phoneNumber = phoneNumber.replace(/\D/g, "");

  // Format the phone number into 3-3-4 segments
  const formattedPhoneNumber = phoneNumber.replace(
    /(\d{3})(\d{3})(\d{4})/,
    "$1-$2-$3"
  );

  return formattedPhoneNumber;
};
