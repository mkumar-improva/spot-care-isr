"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Search02Icon,
  Cancel01Icon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import Logo from "@/components/ui/logo";
import { HugeiconsIcon } from "@hugeicons/react";
import MobileSearchServiceForm from "./mobile-search-service-form";
import MobileProviderServiceForm from "./mobile-provider-service-form";
import useSearchUiStore from "store/ui/search-ui-store";
import logoImg from "@/assets/app/spot/full.png";
import RenderSearchFormCategory from "./render-searchform-category";
import useRadiusPopOver from "@/hooks/search/use-radius-pop-over";
import useProviderInputType from "@/hooks/search/use-provider-input-type";
import useLoadingState from "@/store/loader/loding-state";
import ButtonPrimary from "@/components/ui/button/types/button-primary";

const SearchMobile = () => {
  const { showHeroMobileSearch, searchActiveTab, setShowHeroMobileSearch } =
    useSearchUiStore();

  const { loading, isWishlistLoaded } = useLoadingState();

  //handlers
  const closeDialog = () => {
    setShowHeroMobileSearch(false);
  };

  //hooks
  const { SearchOption } = useRadiusPopOver({});
  const { SearchOption: SearchOptionProvider } = useProviderInputType();

  return (
    <Transition appear show={showHeroMobileSearch} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-50 overflow-hidden block md:hidden`}
        onClose={closeDialog}
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
          <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50 block xl:hidden" />
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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden transition-all block xl:hidden">
                <div
                  className="w-full h-full flex flex-col transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-[#f1f5f9]
                    drawer-container"
                >
                  {/* Header */}
                  <div className="w-full flex items-center justify-between pl-5 pr-4 py-4">
                    <Logo
                      img={logoImg}
                      alt="SpotCare Logo"
                      href="/"
                      className="w-[4.15rem] relative z-[999999]"
                    />
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      onClick={closeDialog}
                      className="size-6 cursor-pointer text-neutral-600"
                    />
                  </div>

                  {/* Mobile Search Form */}
                  <div className="flex-grow overflow-y-auto scrollbar-hide">
                    <div className="w-full h-full flex flex-col items-start justify-start gap-[1rem]">
                      <RenderSearchFormCategory />
                      <div className="w-full h-full bg-white rounded-t-[2.5rem] shadow-xl shadow-neutral-500 px-0 py-6 xsm:py-12">
                        {searchActiveTab === "services" ? (
                          <MobileSearchServiceForm />
                        ) : (
                          <MobileProviderServiceForm />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Footer Section */}
                  <div className="bg-white w-full flex justify-between items-center p-5">
                    <ButtonPrimary
                      className="w-full bg-primary-700 font-medium text-white rounded-lg px-6 py-2 text-base hover:bg-primary-800 
                    transition-colors duration-200 ease-in-out"
                      onclick={
                        searchActiveTab === "services"
                          ? SearchOption
                          : SearchOptionProvider
                      }
                      loading={loading || isWishlistLoaded}
                    >
                      <span>Search</span>
                    </ButtonPrimary>
                    <button></button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchMobile;
