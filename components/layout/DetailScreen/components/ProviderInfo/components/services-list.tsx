import { useCareTypes } from "@/hooks/detailscreen";
import careTypePresent from "@/utils/care-type-present";
import { Badge } from "@/components/ui/badge";

const ServicesList = ({ services }: { services: string[] }) => {
  const { careTypes } = useCareTypes();

  return (
    <ol className="flex flex-wrap text-gray-600 text-base gap-[1rem]">
      {services
        .filter((profile: string) => careTypePresent(profile, careTypes))
        .map((profile: string, index: number) => (
          <Badge
            key={profile}
            className="bg-purple-100 text-purple-800 text-sm"
          >
            {profile}
          </Badge>
        ))}
    </ol>
  );
};

export default ServicesList;
