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
import AuthWatcherClient from "@/components/dialogs/components/auth/components/auth-watcher-client";
import React from "react";
import "rc-slider/assets/index.css";
import UseTouchDeviceWatcher from "@/hooks/common/use-touch-device-watcher";
import UseHomeScreen from "@/hooks/home/use-home-screen";

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
  const [careTypesResult] = await Promise.allSettled([
    Services.LoadCareTypes(),
  ]);

  const cares =
    careTypesResult.status === "fulfilled"
      ? careTypesResult.value?.cares || []
      : [];

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <GoogleMapsProvider>
          <SearchMobile />
          <UseHomeScreen careTypes={cares} />
          <SiteHeader />
          <main className="min-h-screen">
            {/* <Suspense fallback={<Loading />}></Suspense> */}
            {children}
          </main>
          <ToastProvider />
          <Footer />
          <DialogRenderer />
          <AuthWatcherClient />
          <UseTouchDeviceWatcher />
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
