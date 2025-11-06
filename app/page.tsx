import PageHome from "@/components/layout/home/Component";
import { Metadata } from "next";
import { getSiteUrl, absoluteUrl } from "@/lib/site";
import logoImg from "@/assets/app/spot/full.png";

//seo
const siteUrl = getSiteUrl();
// Using your logo as fallback SEO image
const ogImageUrl = `${siteUrl}${logoImg.src}`;
const twitterImageUrl = `${siteUrl}${logoImg.src}`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Spot.care | Find Trusted Healthcare Providers in the USA",
  description:
    "Connect with top-rated healthcare providers in the USA. Compare assisted living, skilled nursing, hospice, and home health services.",
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title: "Spot.care | Find Trusted Healthcare Providers in the USA",
    description:
      "Discover and compare top healthcare providers nationwide. SpotCare helps you find the right care with trusted reviews and verified listings.",
    siteName: "Spot.care",
    images: [
      {
        url: ogImageUrl,
        alt: "Spot.care Logo - Find Healthcare Providers in the USA",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spot.care | Find Trusted Healthcare Providers in the USA",
    description:
      "Find and compare trusted healthcare providers across the USA with Spot.care.",
    images: [twitterImageUrl],
    site: "@SpotCare",
    creator: "@SpotCare",
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

//module
export default function HomePage() {
  return <PageHome />;
}
