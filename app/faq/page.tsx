import { FaqComponent } from "@/components/layout/Faq/Component";
import { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import logoImg from "@/assets/app/spot/full.png";

const siteUrl = getSiteUrl();
const ogImageUrl = `${siteUrl}${logoImg.src}`;
const twitterImageUrl = `${siteUrl}${logoImg.src}`;

export const metadata: Metadata = {
  title: "FAQ | Spot.care - Healthcare Questions Answered",
  description:
    "Get clear answers to frequently asked questions about Spot.care. Learn how to connect with trusted healthcare providers for assisted living, skilled nursing, hospice, and home health services across the USA.",
  keywords: [
    "Spot.care FAQ",
    "healthcare questions",
    "assisted living",
    "home health",
    "hospice care",
    "skilled nursing",
    "senior care information",
  ],
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
  openGraph: {
    title: "FAQ | Spot.care - Healthcare Questions Answered",
    description:
      "Find answers to common healthcare questions and learn how Spot.care connects you with the best providers across the USA.",
    url: `${siteUrl}/faq`,
    siteName: "Spot.care",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Spot.care - FAQ Page Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Spot.care - Healthcare Questions Answered",
    description:
      "Explore Spot.care’s FAQ section to find quick answers about connecting with healthcare providers, assisted living, hospice, and more.",
    images: [twitterImageUrl],
    creator: "@spotcare_official", // optional if you have an official handle
  },
  icons: {
    icon: "/symbol.png",
    shortcut: "/symbol.png",
  },
};

export default function Page() {
  return <FaqComponent />;
}
