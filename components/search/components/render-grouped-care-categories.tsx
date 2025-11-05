import React, { FC } from "react";
import { Cares } from "@/types/care-types";

interface RenderGroupedCareCategoriesProps {
  groupedCareCategories: Cares[];
  highlightedIndex: number;
  handleSelectLocation: (care: string, id: number) => void;
}

const RenderGroupedCareCategories: FC<RenderGroupedCareCategoriesProps> = ({
  groupedCareCategories = [],
  highlightedIndex = -1,
  handleSelectLocation,
}) => {
  let itemIndex = -1;
  return groupedCareCategories.map((item: Cares, index) => (
    <div key={index} className="mb-2">
      <h3 className="px-4 sm:px-8 font-semibold text-base text-neutral-800 dark:text-neutral-100">
        {item.name}
      </h3>
      {item.careTypes.map((care) => {
        itemIndex++;
        const isHighlighted = itemIndex === highlightedIndex;
        return (
          <span
            onClick={() => handleSelectLocation(care, 0)}
            key={care}
            className={`flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer ${
              isHighlighted ? "bg-neutral-100 dark:bg-neutral-700" : ""
            }`}
          >
            <span className="block text-neutral-400"></span>
            <span className="block font-medium text-neutral-700 dark:text-neutral-200">
              {care}
            </span>
          </span>
        );
      })}
    </div>
  ));
};

export { RenderGroupedCareCategories };
