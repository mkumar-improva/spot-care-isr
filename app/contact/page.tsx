import ContactComponent from "@/components/layout/Contact/Component";
import { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import logoImg from "@/assets/app/spot/full.png";

const siteUrl = getSiteUrl();
// Using your logo as fallback SEO image
const ogImageUrl = `${siteUrl}${logoImg.src}`;
const twitterImageUrl = `${siteUrl}${logoImg.src}`;

//seo
export const metadata: Metadata = {
  title: "Contact Spot.care | Trusted Healthcare Providers in the USA",
  description:
    "Get in touch with Spot.care to connect with trusted healthcare providers across the USA. Reach us for inquiries about assisted living, skilled nursing, hospice, and home health services.",
  keywords: [
    "contact Spot.care",
    "healthcare providers USA",
    "assisted living",
    "skilled nursing",
    "home health",
    "hospice care",
    "senior care contact",
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Spot.care | Trusted Healthcare Providers in the USA",
    description:
      "Reach Spot.care for inquiries about top-rated healthcare services — assisted living, skilled nursing, hospice, and home health — across the United States.",
    url: `${siteUrl}/contact`,
    siteName: "Spot.care",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Spot.care Contact Page Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Spot.care | Trusted Healthcare Providers in the USA",
    description:
      "Contact Spot.care to connect with trusted healthcare providers across the USA — assisted living, hospice, home health, and more.",
    images: [twitterImageUrl],
    creator: "@spotcare_official", // optional, if you have a handle
  },
  icons: {
    icon: "/symbol.png",
    shortcut: "/symbol.png",
  },
};

export default function ContactPage() {
  return <ContactComponent />;
}
