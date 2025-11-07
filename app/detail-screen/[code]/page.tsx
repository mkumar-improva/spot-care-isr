import { Metadata } from "next";
import { DetailScreenComponent } from "@/components/layout/DetailScreen/Component";
import { getSiteUrl } from "@/lib/site";
import logoImg from "@/assets/app/spot/full.png";

interface DetailScreenPageProps {
  params: {
    code: string;
  };
  searchParams: {
    lat?: string;
    lon?: string;
    distance?: string;
  };
}

const siteUrl = getSiteUrl();
const ogImageUrl = `${siteUrl}${logoImg.src}`;
const twitterImageUrl = `${siteUrl}${logoImg.src}`;

//seo

// Static metadata
export async function generateMetadata({
  params,
}: {
  params: { code: string };
}): Promise<Metadata> {
  const ogImageUrl = `${siteUrl}${logoImg.src}`;
  const twitterImageUrl = `${siteUrl}${logoImg.src}`;
  const pageUrl = `${siteUrl}/detail-screen/${params.code}`;

  return {
    title: `Provider Details | Spot Care`,
    description: "View provider details, ratings, and contact information.",
    robots: "noindex, nofollow",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Provider Details | Spot Care",
      description:
        "Explore trusted healthcare providers’ details, ratings, and services with Spot Care.",
      url: pageUrl,
      siteName: "Spot Care",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Spot Care - Provider Details Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Provider Details | Spot Care",
      description:
        "Find complete information about healthcare providers, services, and contact details on Spot Care.",
      images: [twitterImageUrl],
    },
  };
}

export default function DetailScreenPage({
  params,
  searchParams,
}: DetailScreenPageProps) {
  return (
    <DetailScreenComponent
      code={params.code}
      latitude={searchParams.lat}
      longitude={searchParams.lon}
      distance={searchParams.distance}
    />
  );
}
