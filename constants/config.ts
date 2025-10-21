export const Config = {
  URL: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL || "",
    API_V2: process.env.NEXT_PUBLIC_API_V2 || process.env.API_BASE_URL || "",
  },
  KEY: {
    MAP:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      process.env.REACT_APP_MAP ||
      "",
    DUMMY_IMAGE: process.env.NEXT_PUBLIC_DUMMY_IMAGE || "",
  },
};
