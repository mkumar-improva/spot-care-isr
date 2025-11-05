import DetailScreen from "@/components/layout/DetailScreen/Component.Client";
import { Services } from "@/services/service";
import { filterSections, parseProvider } from "@/utils/makers";
import { Providers } from "@/types/provider-details";

interface DetailScreenComponentProps {
  code?: string;
  latitude?: string;
  longitude?: string;
  distance?: string;
}

export async function DetailScreenComponent({
  code,
  latitude,
  longitude,
  distance,
}: DetailScreenComponentProps) {
  let initialProvider: Providers | null = null;

  if (code) {
    try {
      const providerData = await Services.GetProvider(code);
      if (providerData && providerData.code) {
        const qnaResponse = await Services.LoadQnA(providerData.code);
        const dist = distance ? Number(distance) : 0;
        initialProvider = parseProvider(providerData, dist);
        if (qnaResponse) {
          const claimStatus = qnaResponse.claimStatus;
          const filteredSections = filterSections(qnaResponse.sections || []);
          initialProvider = { ...initialProvider, sections: filteredSections, claimStatus };
        }
      }
    } catch (error) {
      initialProvider = null;
    }
  }

  return (
    <DetailScreen
      code={code}
      latitude={latitude}
      longitude={longitude}
      distance={distance}
      initialProvider={initialProvider}
    />
  );
}

export default DetailScreenComponent;