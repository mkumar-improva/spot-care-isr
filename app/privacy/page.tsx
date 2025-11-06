import PrivacyPolicy from "@/components/layout/Privacy/Component.Client";
import { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import logoImg from "@/assets/app/spot/full.png";

const siteUrl = getSiteUrl();
const ogImageUrl = `${siteUrl}${logoImg.src}`;
const twitterImageUrl = `${siteUrl}${logoImg.src}`;

export const metadata: Metadata = {
  title: "Privacy Policy | Spot.care",
  description:
    "Learn how Spot.care collects, protects, and uses your personal data. Our Privacy Policy outlines how we maintain transparency and security while connecting you with trusted healthcare providers in the USA.",
  keywords: [
    "Spot.care privacy policy",
    "data protection",
    "HIPAA compliance",
    "healthcare privacy",
    "user data security",
    "Spot.care terms",
  ],
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy | Spot.care",
    description:
      "Understand how Spot.care safeguards your privacy and handles data securely when you connect with healthcare providers across the USA.",
    url: `${siteUrl}/privacy`,
    siteName: "Spot.care",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Spot.care Privacy Policy Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Spot.care",
    description:
      "Read Spot.care’s Privacy Policy to see how we protect your data and ensure secure healthcare provider connections.",
    images: [twitterImageUrl],
    creator: "@spotcare_official", // optional
  },
  icons: {
    icon: "/symbol.png",
    shortcut: "/symbol.png",
  },
};

const PrivacyPage: React.FC = () => {
  return <PrivacyPolicy />;
};

export default PrivacyPage;
