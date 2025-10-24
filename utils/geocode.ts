import { AddressComponents, AddressComponent } from "@/types/location-types";
import { Config } from "@/constants/config";

export const extractAddress = (address: string) => {
  const addressComponents = address.split(","); // Split address by commas
  return addressComponents.slice(0, -1).join(", "); // Remove postal
};

export const getComponent = (
  components: AddressComponents,
  type: string
): string => {
  return (
    components.find((component) => component.types.includes(type))?.long_name ||
    ""
  );
};

export const fetchPostalCode = async (lat: number, lng: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${Config.KEY.MAP}`;
  const response = await fetch(url);
  const data = await response.json();
  const postalCodeComponent = data.results[0].address_components.find(
    (comp: AddressComponent) => comp.types.includes("postal_code")
  );
  return postalCodeComponent
    ? postalCodeComponent.long_name
    : "Postal code not available";
};
