import { Metadata } from "next";
import { DetailScreenComponent } from "@/components/layout/DetailScreen/Component";

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

// Static metadata
export const metadata: Metadata = {
  title: "Provider Details | Spot Care",
  description: "View provider details, ratings, and contact information.",
  robots: "noindex, nofollow",
};

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
