export const Config = {
  URL: {},
  KEY: {
    MAP: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.REACT_APP_MAP || "",
    EMAIL: process.env.NEXT_PUBLIC_EMAIL || "support@spot.care",
    SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
    BLOG_URL: process.env.NEXT_PUBLIC_SPOTCARE_BLOG_URL || "",
  },
};
