"use client";
import React, { FC, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import NavMobile from "./nav-mobile";

interface RenderSavedProviderContentProps {
  isDrawerOpen: boolean;
  handleCloseDrawer: () => void;
}

const RenderSavedProviderContent: FC<RenderSavedProviderContentProps> = ({
  isDrawerOpen = false,
  handleCloseDrawer,
}) => {
  return (
    <Transition appear show={isDrawerOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 overflow-hidden"
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter=" duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave=" duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex justify-end h-full">
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 transform"
              enterFrom="opacity-0 translate-x-56"
              enterTo="opacity-100 translate-x-0"
              leave="transition duration-150 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-56"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden transition-all ">
                <NavMobile handleCloseDrawer={handleCloseDrawer} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RenderSavedProviderContent;
