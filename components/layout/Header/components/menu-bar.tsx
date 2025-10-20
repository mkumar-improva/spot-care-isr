"use client";
import React, { FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import useMenuBar from "@/hooks/header/use-menu-bar";
import { HugeiconsIcon } from "@hugeicons/react";

interface MenuBarProps {
  className?: string;
  iconClassName?: string;
}

const MenuBar: FC<MenuBarProps> = ({
  className = "p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300",
  iconClassName = "size-7",
}) => {
  const { menuBarRef, solutionsFoot } = useMenuBar();

  return (
    <div className="MenuDropdown" ref={menuBarRef}>
      <Popover className={`relative`}>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`text-2xl md:text-3xl relative md:w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 
                md:hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={iconClassName}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </Popover.Button>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] mt-4 md:right-10 right-0 px-2">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutionsFoot
                      .filter((item) => {
                        return item.name !== "Logout";
                      })
                      .map((item, index) => (
                        <div
                          key={index}
                          onClick={item.function}
                          className="cursor-pointer flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100
                             dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <HugeiconsIcon
                              icon={item.icon}
                              size={24}
                              color="currentColor"
                              strokeWidth={1.2}
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium ">{item.name}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default MenuBar;
