"use client";
import { FC, MutableRefObject } from "react";

interface RenderRecentSearchProps {
  onClick: (value: string, onClose: () => void) => void;
  optionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  highlightedIndex?: number;
  onClose: (
    focusableElement?:
      | HTMLElement
      | React.MouseEvent<HTMLElement>
      | MutableRefObject<HTMLElement | null>
      | undefined
  ) => void;
}

const radiusOptions = [
  "5 miles",
  "10 miles",
  "15 miles",
  "20 miles",
  "25 miles",
  "30 miles",
];

const RenderRecentSearch: FC<RenderRecentSearchProps> = ({
  onClick,
  optionRefs,
  highlightedIndex = -1,
  onClose,
}) => {
  return (
    <>
      <div className="w-full flex flex-col items-start gap-[.25rem]">
        {radiusOptions.map((item, index) => (
          <span
            ref={(el) => (optionRefs.current[index] = el)}
            onClick={() => {
              onClick(item || "", onClose);
            }}
            key={item}
            className={`w-full py-[1rem] px-[2.5rem] items-center cursor-pointer rounded-md block font-medium text-neutral-700 dark:text-neutral-200
                ${
                  highlightedIndex === index
                    ? "bg-neutral-100 dark:bg-neutral-700"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
                }`}
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
};

export default RenderRecentSearch;
