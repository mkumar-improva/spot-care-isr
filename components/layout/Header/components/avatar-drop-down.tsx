"use client";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import { AUTH_KEYS } from "@/constants/KeyConstants";
import AvatarPopoverPanel from "./avatar-popover-panel";

const AvatarDropDown = () => {
  const { isLoggedIn, profileImage } = useAuthUIStore();

  const localStoredProfileImage =
    localStorage.getItem(AUTH_KEYS.PROFILEIMAGE) ?? "";
  const localStoredUserName = localStorage.getItem(AUTH_KEYS.USERNAME) ?? "";

  return (
    <div>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button className="rounded-3xl inline-flex items-center focus:outline-none">
              <Avatar
                imgUrl={profileImage || localStoredProfileImage}
                userName={localStoredUserName ?? ""}
                sizeClass="size-9 md:size-11"
                textSize="text-sm md:text-lg"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel 
                className="absolute z-50 w-screen max-w-[260px] px-4 mt-4 -right-10 xs:right-0 xs:px-2"
                focus
              >
                <AvatarPopoverPanel onClose={close} />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default AvatarDropDown;
