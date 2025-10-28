import DetailScreen from "@/components/layout/DetailScreen/Component.Client";

interface DetailScreenComponentProps {
  code?: string;
  latitude?: string;
  longitude?: string;
  distance?: string;
}

export function DetailScreenComponent({
  code,
  latitude,
  longitude,
  distance,
}: DetailScreenComponentProps) {

  return (
    <DetailScreen
      code={code}
      latitude={latitude}
      longitude={longitude}
      distance={distance}
    />
  );
}
