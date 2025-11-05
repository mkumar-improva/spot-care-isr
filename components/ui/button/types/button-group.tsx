"use client";

import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { _renderLoading } from "../button";

export interface buttonGroupProps {
  fieldName: string;
  className: string;
  onClick: () => void;
  isDisabled: boolean;
  icon: IconSvgElement;
  size?: number;
  loading?: boolean;
}

const ButtonGroup = ({ props }: { props: buttonGroupProps[] }) => {
  return (
    <div className="w-full flex items-center justify-between cursor-pointer">
      {props.map((e, index) => (
        <button
          key={index}
          className={e.className}
          onClick={e.onClick}
          disabled={e.isDisabled}
        >
          <span className="flex items-center justify-center gap-2 text-base">
            {e.loading ? (
              _renderLoading()
            ) : (
              <HugeiconsIcon icon={e.icon} size={e.size ? e.size : 20} />
            )}

            {e.fieldName}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
