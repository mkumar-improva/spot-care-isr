import type { Metadata } from "next";
import "@/styles/index.scss";
import "@/styles/globals.css";
import { getDefaultSocialImage, getSiteUrl } from "@/lib/site";
import GoogleMapsProvider from "@/components/providers/google-maps-provider";
import { Footer } from "@/components/layout/Footer/Component";
import SiteHeader from "@/components/layout/Header/Component.Client";
import SearchMobile from "@/components/search/components/search-mobile";
import ClientStoreInitializerProps from "@/components/data/client-store-initializer";
import { Services } from "@/services/service";
import { ToastProvider } from "@/components/ui/toast/toast-provider";
import DialogRenderer from "@/components/dialogs/Component";
import ResetPasswordWatcherServer from "@/components/dialogs/components/reset-password/components/reset-password-watcher-server";

const SITE_NAME = "SpotCare Healthcare Provider Directory";
const SITE_DESCRIPTION =
  "Search and browse trusted healthcare providers across the SpotCare network with real-time ISR updates.";
const SITE_TAGLINE = "Find the right care provider in seconds.";
const siteUrl = getSiteUrl();
const { url: openGraphImageUrl, alt: socialImageAlt } =
  getDefaultSocialImage("opengraph");
const { url: twitterImageUrl } = getDefaultSocialImage("twitter");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_NAME,
    template: `%s | SpotCare`,
  },
  description: SITE_DESCRIPTION,
  applicationName: "SpotCare",
  authors: [{ name: "SpotCare" }],
  creator: "SpotCare",
  publisher: "SpotCare",
  keywords: [
    "healthcare providers",
    "SpotCare",
    "care directory",
    "medical services",
    "incremental static regeneration",
    "provider search",
  ],
  category: "Healthcare",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: SITE_NAME,
    description: `${SITE_DESCRIPTION} ${SITE_TAGLINE}`,
    siteName: "SpotCare",
    images: [
      {
        url: openGraphImageUrl,
        alt: socialImageAlt,
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: `${SITE_DESCRIPTION} ${SITE_TAGLINE}`,
    site: "@SpotCare",
    creator: "@SpotCare",
    images: [twitterImageUrl],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Fetch all required data on server-side
  const [careTypesResult, ipInfo, homeScreenData] = await Promise.allSettled([
    Services.LoadCareTypes(),
    Services.GetIPAddress(),
    loadHomeScreenData(),
  ]);

  const cares =
    careTypesResult.status === "fulfilled"
      ? careTypesResult.value?.cares || []
      : [];
  const ipInfoData = ipInfo.status === "fulfilled" ? ipInfo.value : null;
  const homeData =
    homeScreenData.status === "fulfilled" ? homeScreenData.value : null;

  return (
    <html lang="en">
      <body>
        <GoogleMapsProvider>
          <SearchMobile />
          <ClientStoreInitializerProps
            careTypes={cares}
            ipInfo={ipInfoData || null}
            homeScreenData={homeData}
          />
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <ToastProvider />
          <Footer />
          <DialogRenderer />
        </GoogleMapsProvider>
      </body>
    </html>
  );
}

async function loadHomeScreenData() {
  try {
    // Get IP info first
    const ipInfo = await Services.GetIPAddress();

    if (!ipInfo) {
      // Fallback to NYC if no IP info
      const fallbackData = await Services.LoadCaresForHomeScreen(
        40.7127753,
        -74.0059728,
        25,
        10
      );
      return {
        providers: fallbackData?.data || [],
        total: fallbackData?.total || 0,
        location: { lat: 40.7127753, lon: -74.0059728, city: "New York" },
        isUSLocation: false,
      };
    }

    const isUS = ipInfo.location?.country === "United States";
    const lat = isUS ? ipInfo.location?.latitude : undefined;
    const lon = isUS ? ipInfo.location?.longitude : undefined;
    const city = isUS ? ipInfo.location?.city : undefined;

    const hasValidCoords = typeof lat === "number" && typeof lon === "number";

    if (hasValidCoords) {
      // Try user's location first
      const liveData = await Services.LoadCaresForHomeScreen(
        lat!,
        lon!,
        30,
        25
      );

      if (liveData && liveData.total > 0) {
        return {
          providers: liveData.data,
          total: liveData.total,
          location: { lat: lat!, lon: lon!, city: city || "Unknown" },
          isUSLocation: true,
        };
      }
    }

    // Fallback to NYC
    const fallbackData = await Services.LoadCaresForHomeScreen(
      40.7127753,
      -74.0059728,
      25,
      10
    );
    return {
      providers: fallbackData?.data || [],
      total: fallbackData?.total || 0,
      location: { lat: 40.7127753, lon: -74.0059728, city: "New York" },
      isUSLocation: false,
    };
  } catch (error) {
    console.error("Error loading home screen data:", error);
    return null;
  }
}
