import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons-pro/core-stroke-standard/index";
import { ServiceIcon } from "@hugeicons-pro/core-solid-rounded/index";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { TitleCase } from "utils/converter";

interface BreadCrumbsProps {
  serviceName: string;
  location: string;
  providerName: string;
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({
  serviceName = "",
  location = "",
  providerName = "",
}) => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center gap-2 text-sm md:text-base text-neutral-500 font-medium overflow-hidden">
      <div className="flex items-center gap-1 min-w-0">
        <HugeiconsIcon
          icon={ServiceIcon}
          className="w-4 h-4 md:w-5 md:h-5 mb-[1px] flex-shrink-0"
        />
        <p
          className="cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
          onClick={() => router.back()}
        >
          {serviceName}
        </p>
      </div>

      <HugeiconsIcon
        icon={ArrowRight01Icon}
        className="w-4 h-4 text-neutral-400 flex-shrink-0"
      />

      <p
        className="cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
        onClick={() => router.back()}
      >
        {location}
      </p>

      <HugeiconsIcon
        icon={ArrowRight01Icon}
        className="w-4 h-4 text-neutral-400 flex-shrink-0"
      />

      <p className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
        {TitleCase(providerName)}
      </p>
    </div>
  );
};

export default BreadCrumbs;
