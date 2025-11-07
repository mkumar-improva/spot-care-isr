"use client";
import {
  CustomerSupportIcon,
  ShutDownIcon,
  UserIcon,
  City02Icon,
  Location01Icon,
  LeftToRightListBulletIcon,
  FavouriteIcon,
  Hospital02Icon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import { HugeiconsIcon } from "@hugeicons/react";
import useAuthDataStore from "@/store/data/use-auth-data-store";
import useHeaderUiStore from "@/store/ui/header-ui-store";
import { useRouter } from "next/navigation";
import { AuthHelper } from "@/utils/auth-helper";
import useAuthUIStore from "@/store/ui/auth-ui-store";

interface AvatarPopoverPanelProps {
  onClose?: () => void;
}

const AvatarPopoverPanel = ({ onClose }: AvatarPopoverPanelProps) => {
  const router = useRouter();

  //store
  const { userDetail, setUserDetail } = useAuthDataStore();
  const {
    firstName,
    lastName,
    userName,
    email,
    setIsLoggedIn,
    setProfileImage,
  } = useAuthUIStore();
  const { isHomePage } = useHeaderUiStore();

  //handler
  const onHelpClicked = () => {
    onClose?.();
    router.push("/contact");
  };
  const onAccountClicked = () => {
    onClose?.();
    router.push("/account");
  };
  const logout = () => {
    onClose?.();
    setUserDetail(null);
    setProfileImage("");
    setIsLoggedIn(false);
    AuthHelper.clearSession();
    router.push("/");
  };

  //data
  const solutions = [
    {
      name: "Help",
      href: "##",
      icon: CustomerSupportIcon,
      onclick: onHelpClicked,
      siteKey: "provider.help",
    },

    {
      name: "Logout",
      href: "##",
      icon: ShutDownIcon,
      onclick: logout,
      siteKey: "provider.logout",
    },
  ];

  const topSolutions = [
    {
      name: "Account",
      href: "#",
      icon: UserIcon,
      onclick: onAccountClicked,
      isEnabled: true,
      siteKey: "provider.account",
    },
    // {
    //   name: "Your listings",
    //   href: "#",
    //   icon: Hospital02Icon,
    //   onclick: onYourBusinessClicked,
    //   isEnabled: claimedProviders && claimedProviders.length > 0,
    //   siteKey: "provider.businesslistings",
    // },
    // {
    //   name: "Wishlist",
    //   href: "#",
    //   icon: FavouriteIcon,
    //   onclick: () => {
    //     setIsDrawerClose(false);
    //     setEmailDialogOpen(false);
    //   },
    //   isEnabled: savedProviderList && savedProviderList.length > 0,
    //   siteKey: "provider.wishlist",
    // },
    // {
    //   name: "List your business",
    //   href: "#",
    //   icon: City02Icon,
    //   onclick: () => {},
    //   isEnabled: true,
    //   siteKey: "provider.businesslistings",
    // },
  ];

  return (
    <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
        <div
          className=" cursor-pointer flex items-center px-2 py-1 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
            focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
        >
          <div className="ml-2">
            <p className="text-base font-semibold">
              {userDetail?.firstName ?? firstName ?? ""}{" "}
              {userDetail?.lastName ?? lastName ?? ""}
            </p>
            <p className="text-xs font-medium text-neutral-500">
              {userDetail?.email ?? email ?? ""}
            </p>
          </div>
        </div>
        {/* Options */}
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-full"></div>
        {topSolutions
          .filter((item) => {
            if (
              item.name === "List your business" ||
              item.name === "Map" ||
              item.name === "List"
            )
              return false;
            if (isHomePage && (item.name === "List" || item.name === "Map")) {
              return false;
            }
            //   if (
            //     item.name === "Wishlist" &&
            //     (!savedProviderList || savedProviderList.length === 0)
            //   ) {
            //     return false;
            //   }
            //   if (
            //     item.name === "Your Business" &&
            //     (!claimedProviders || claimedProviders.length === 0)
            //   ) {
            //     return false;
            //   }
            return true;
          })
          .map((item, index) => (
            <div
              key={index}
              onClick={() => {
                onClose?.();
                item.onclick();
              }}
              className={`${
                item.name === "List your business" ? "flex sm:hidden" : ""
              }${
                item.name === "Map" || item.name === "List"
                  ? "flex xl:hidden"
                  : ""
              } cursor-pointer flex items-center justify-start p-2 -m-3 gap-x-4 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
            >
              <div className="flex items-center justify-start flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                <HugeiconsIcon
                  icon={item.icon}
                  className="w-6 h-6"
                  aria-hidden="true"
                />
              </div>
              <div className="">
                <p className="text-sm font-medium">{item.name}</p>
              </div>
            </div>
          ))}
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-full"></div>
        {/* bootom options */}
        {solutions.map((item, index) => (
          <div
            key={index}
            // to={item.href}
            onClick={() => {
              onClose?.();
              item.onclick();
            }}
            className=" cursor-pointer flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
          >
            <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
              <HugeiconsIcon
                icon={item.icon}
                className="w-6 h-6"
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
  );
};

export default AvatarPopoverPanel;
