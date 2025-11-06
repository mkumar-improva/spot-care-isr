import Terms from "@/components/layout/Terms/Component";
import { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import logoImg from "@/assets/app/spot/full.png";

const siteUrl = getSiteUrl();
const ogImageUrl = `${siteUrl}${logoImg.src}`;
const twitterImageUrl = `${siteUrl}${logoImg.src}`;

export const metadata: Metadata = {
  title: "Terms & Conditions | Spot.care",
  description:
    "Review Spot.care’s Terms & Conditions to understand the policies, usage rules, and legal guidelines for accessing our healthcare provider platform across the USA.",
  keywords: [
    "Spot.care terms and conditions",
    "user agreement",
    "healthcare platform policy",
    "Spot.care terms of use",
    "legal information",
    "Spot.care user rights",
  ],
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  openGraph: {
    title: "Terms & Conditions | Spot.care",
    description:
      "Understand the legal guidelines and user responsibilities when using Spot.care to connect with trusted healthcare providers in the USA.",
    url: `${siteUrl}/terms`,
    siteName: "Spot.care",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Spot.care Terms & Conditions Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Spot.care",
    description:
      "Read Spot.care’s Terms & Conditions to learn the legal policies and responsibilities for using our healthcare platform.",
    images: [twitterImageUrl],
    creator: "@spotcare_official", // optional if you have a handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function TermsPage() {
  return <Terms />;
}
