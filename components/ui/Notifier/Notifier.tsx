import { ArrowRight01Icon } from "@hugeicons-pro/core-stroke-sharp/index";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { NotifierModel } from "types/NotifierModel";
import { Cancel01Icon } from "@hugeicons-pro/core-stroke-standard/index";

type NotifierProps = NotifierModel & { notifierState: boolean };

const Notifier: React.FC<NotifierProps> = ({
  mode = "success",
  message,
  notifierState,
  link,
  className,
  textAlign = "text-left",
  onClick,
  showDefaultMessage = true, // Default to true to show default message
  onClose,
}) => {
  const modeStyles = {
    success: {
      background: "bg-green-200",
      text: "text-green-700 dark:text-green-500",
      defaultMessage: "Action completed successfully",
    },
    error: {
      background: "bg-red-50",
      text: "text-red-500",
      defaultMessage: "Something went wrong",
    },
    warning: {
      background: "bg-yellow-50",
      text: "text-yellow-400",
      defaultMessage: "Please be cautious",
    },
  };

  // Get the styles and message based on the mode
  const { text, defaultMessage, background } = modeStyles[mode];
  const displayMessage = message || defaultMessage;

  return (
    <>
      {displayMessage &&
        (notifierState ? (
          <div
            className={`w-full flex items-center ${className} ${background} py-3 px-4 rounded-lg  transition-all duration-300`}
          >
            <div
              className={`w-full text-sm font-base ${textAlign} ${text}  break-words tracking-[.5px]`}
            >
              <div className="flex items-center justify-between w-full">
                <p className="break-words">
                  {displayMessage}
                  {link && (
                    <span className="inline-flex items-center gap-0">
                      {link.includes("Verify") ? (
                        <>&nbsp;. &nbsp;</>
                      ) : (
                        <>&nbsp;- &nbsp;</>
                      )}
                      <span
                        className="hover:underline text-primary-500 cursor-pointer inline-flex items-center gap-1"
                        onClick={onClick}
                      >
                        {link}
                        {link.includes("Verify") && (
                          <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                        )}
                      </span>
                    </span>
                  )}
                </p>
                <HugeiconsIcon icon={Cancel01Icon} className={`size-4 cursor-pointer`} strokeWidth={2} onClick={onClose}/>
              </div>
            </div>
          </div>
        ) : (
          showDefaultMessage && <p className="text-sm">&nbsp;</p>
        ))}
    </>
  );
};

export default Notifier;
