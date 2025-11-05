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

  const loc = locations[0];

  // Extract ZIP if embedded: supports 5-digit and ZIP+4 formats
  const zipRegex = /\b\d{5}(?:-\d{4})?\b/;
  const zipMatch = loc?.address?.match(zipRegex);
  const zipInAddress = zipMatch ? zipMatch[0] : null;

  // Pre-clean raw address (remove ZIP if present)
  const cleanedAddress = loc?.address?.replace(zipRegex, "").trim() ?? "";

  // Split into components
  const raw =
    cleanedAddress
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean) || [];

  const city = loc?.city?.trim();
  const state = loc?.state?.trim();

  // Final postal: prioritize explicit field, fallback to parsed ZIP
  const postal =
    loc?.postalCode?.split("-")[0]?.trim() || zipInAddress?.split("-")[0];

  const parts = [...raw];

  // Inject city/state only if absent already
  if (city && !parts.includes(city)) parts.push(city);
  if (state && !parts.includes(state)) parts.push(state);

  // Remove back-to-back dupes
  const uniqueParts = parts.filter((p, i) => p && p !== parts[i - 1]);

  return postal
    ? `${uniqueParts.join(", ")} - ${postal}`
    : uniqueParts.join(", ");
};

export const formatPhoneNumber = (raw: string) => {
  // Extract digits only
  let phone = raw.replace(/\D/g, "");

  // Drop leading country code if present (US or India)
  if (phone.startsWith("91") && phone.length > 10) {
    phone = phone.slice(2);
  } else if (phone.startsWith("1") && phone.length > 10) {
    phone = phone.slice(1);
  }

  // Only format if we have at least 10 digits
  const main = phone.slice(-10);

  // 3-3-4 slice
  return main.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
};
