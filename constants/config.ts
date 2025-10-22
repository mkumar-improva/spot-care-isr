export const Config = {
  URL: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL || "",
    API_V2: process.env.NEXT_PUBLIC_API_V2 || process.env.API_BASE_URL || "",
    IP_FINDER_V2: process.env.NEXT_PUBLIC_IP_FINDER_V2 || "",
    IP_FINDER: process.env.NEXT_PUBLIC_IP_FINDER || "",
  },
  KEY: {
    MAP:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      process.env.REACT_APP_MAP ||
      "",
    DUMMY_IMAGE: process.env.NEXT_PUBLIC_DUMMY_IMAGE || "",
    IP_FINDER_V2_API_KEY: process.env.NEXT_PUBLIC_IP_FINDER_V2_API_KEY || "",
  },
};
