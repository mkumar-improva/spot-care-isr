export type LatLngLiteral = {
  lat: number;
  lng: number;
};

export type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};


export type AddressComponents = AddressComponent[];