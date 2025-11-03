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

  // Split primary address into chunks
  const raw =
    loc?.address
      ?.split(",")
      .map((p) => p.trim())
      .filter(Boolean) || [];

  // City + state from fields
  const city = loc?.city?.trim();
  const state = loc?.state?.trim();
  const postal = loc?.postalCode?.split("-")[0]?.trim();

  // Dedupe logic: prevent re-adding city/state if already in the string
  const parts = [...raw];

  if (city && !parts.includes(city)) parts.push(city);
  if (state && !parts.includes(state)) parts.push(state);

  // Remove consecutive duplicates — belt and suspenders
  const uniqueParts = parts.filter((p, i) => p && p !== parts[i - 1]);

  const formatted = uniqueParts.join(", ") + (postal ? ` - ${postal}` : "");

  return formatted;
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