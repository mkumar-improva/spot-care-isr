import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { formatRating } from "@/utils/overall-ratings";

export const renderProgressBar = (
  value: number,
  label: string,
  icon: IconSvgElement
) => {
  const percentage = (value / 5) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <HugeiconsIcon
            className="text-primary-500"
            icon={icon}
            size={20}
            color="currentColor"
            strokeWidth={1.5}
          />
          <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm font-medium">{formatRating(value)}/5</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3242e1]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
