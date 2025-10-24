export type GeoData = {
  city: {
    name: string;
    names: {
      en: string;
      [key: string]: string;
    };
  };
  continent: {
    code: string;
    geoname_id: number;
    names: {
      de: string;
      en: string;
      es: string;
      fa: string;
      fr: string;
      ja: string;
      ko: string;
      "pt-BR": string;
      ru: string;
      "zh-CN": string;
      [key: string]: string;
    };
    name: string;
  };
  country: {
    geoname_id: number;
    iso_code: string;
    names: {
      de: string;
      en: string;
      es: string;
      fa: string;
      fr: string;
      ja: string;
      ko: string;
      "pt-BR": string;
      ru: string;
      "zh-CN": string;
      [key: string]: string;
    };
    name: string;
    name_native: string;
    phone_code: string;
    capital: string;
    currency: string;
    flag: string;
    languages: {
      iso_code: string;
      name: string;
      name_native: string;
    }[];
  };
  location: {
    latitude: number;
    longitude: number;
  };
  subdivisions: {
    names: {
      en: string;
      [key: string]: string;
    };
  }[];
  state: {
    name: string;
  };
  postal: string;
  datasource: {
    name: string;
    attribution: string;
    license: string;
  }[];
  ip: string;
};


export type IpInfo = {
  ip: string;
  is_vpn: boolean;
  location: {
    is_eu_member: boolean;
    calling_code: string;
    currency_code: string;
    continent: string;
    country: string;
    country_code: string;
    state: string;
    city: string;
    latitude: number;
    longitude: number;
    zip: string;
    timezone: string;
    local_time: string;
    local_time_unix: number;
    is_dst: boolean;
  };
  elapsed_ms: number;
};

