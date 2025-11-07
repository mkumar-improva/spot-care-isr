import { HugeiconsIcon } from "@hugeicons/react";
import { FC, ReactNode } from "react";
import toast from "react-hot-toast";
import { Cancel01Icon } from "@hugeicons-pro/core-stroke-rounded/index";

interface heroSearchCustomToastProps {
  icon: ReactNode;
  description1: string;
  description2: string;
  toasttype: toastTypeInterface;
  toastColor?: "success" | "error" | "info" | "warning";
  removeToast?: (id: string) => void;
}

interface toastTypeInterface {
  id: string;
  visible: boolean;
}

const HeroSearchCustomToast: FC<heroSearchCustomToastProps> = ({
  icon,
  description1,
  description2,
  toasttype,
  toastColor = "info",
  removeToast,
}) => {
  return (
    <div
      className={`${
        toasttype.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full z-[99999] rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-xl ${
        toastColor == "success"
          ? "bg-green-100"
          : toastColor == "error"
          ? "bg-red-100"
          : "bg-yellow-100"
      } dark:bg-neutral-800 relative`}
    >
      <div className="flex-1 p-4">
        <div className="flex items-start">
          {icon}
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
              {description1}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {description2}
            </p>
          </div>
        </div>
      </div>
      <HugeiconsIcon
        icon={Cancel01Icon}
        className="z-10 absolute top-2 right-2 w-4 cursor-pointer"
        onClick={() => {
          if (removeToast) {
            removeToast(toasttype.id);
          } else {
            toast.remove(toasttype.id);
          }
        }}
      />
    </div>
  );
};

export default HeroSearchCustomToast;
