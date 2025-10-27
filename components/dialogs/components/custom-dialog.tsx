import { Transition, Dialog } from "@headlessui/react";
import React, { FC, ReactNode } from "react";

export interface CustomDialogProps {
  isDialogOpen?: boolean;
  handleClose?: () => void;
  children?: ReactNode;
  DialogTitle?: string;
  isTransistion?: boolean;
  pannelPadding?: string;
  maxWidth?: string;
  dialogVisibleClassName?: string;
}

const CustomDialog: FC<CustomDialogProps> = ({
  isDialogOpen = false,
  handleClose = () => {},
  children,
  DialogTitle = "",
  isTransistion = true,
  pannelPadding = "p-2",
  maxWidth = "max-w-5xl",
  dialogVisibleClassName = "block",
}) => {
  return (
    <Transition appear show={isDialogOpen}>
      <Dialog
        as="div"
        className={`w-screen fixed inset-0 z-50 overflow-y-auto ${dialogVisibleClassName}`}
        onClose={handleClose}
      >
        {isTransistion ? (
          <Transition.Child
            enter="duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50 w-full" />
          </Transition.Child>
        ) : (
          <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50 w-full" />
        )}

        <div className="fixed inset-0 flex items-center justify-center p-4">
          {isTransistion ? (
            <Transition.Child
              enter="transition duration-200 ease-out"
              enterFrom="opacity-0 scale-75"
              enterTo="opacity-100 scale-100"
              leave="transition duration-200 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-75"
            >
              <div
                className={`inline-flex flex-col w-full ${maxWidth} text-left align-middle transition-all transform overflow-y-auto max-h-screen rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl`}
              >
                <Dialog.Panel
                  className={`max-h-screen overflow-y-auto ${pannelPadding}`}
                >
                  {children}
                </Dialog.Panel>
              </div>
            </Transition.Child>
          ) : (
            <div
              className={`inline-flex flex-col w-full ${maxWidth} text-left align-middle transition-all transform overflow-y-auto max-h-screen rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl`}
            >
              <Dialog.Panel className="p-2 max-h-screen overflow-y-auto">
                {children}
              </Dialog.Panel>
            </div>
          )}
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomDialog;
