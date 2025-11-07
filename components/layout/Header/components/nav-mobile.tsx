"use client";
import React, { FC, useEffect } from "react";
import useNavMobile from "@/hooks/header/use-nav-mobile";
import ButtonClose from "@/components/ui/button/types/button-close";
import ProviderCard from "@/components/ui/provider-card/provider-card";
import ButtonGroup from "@/components/ui/button/types/button-group";
import { BlobProvider } from "@react-pdf/renderer";
import ReportTemplate from "@/components/ui/template/report-template";
import logoImg from "@/assets/app/spot/full.png";
import toast from "react-hot-toast";
import HeroSearchCustomToast from "@/components/ui/toast/hero-search-custom-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import NotifierSection from "@/components/ui/Notifier/notifier-section";
import { StatusMessages } from "@/constants/StatusMessages";
import EmailProviders from "./email-providers";

interface NavMobileProps {
  className?: string;
  handleCloseDrawer: () => void;
}

const NavMobile: FC<NavMobileProps> = ({
  className = "",
  handleCloseDrawer,
}) => {
  //hooks
  const {
    savedProviderList,
    drawerRef,
    buttonGroupVal,
    triggerDownload,
    currentDateTime,
    servicesTag,
    notifierState,
    NotifierDetails,
    isEmailDialogOpen,
    emailNotifierState,
    emailNotifierDetails,
    setEmailNotifierState,
    setEmailNotifierDetails,
    setEmailDialogOpen,
    setNotifierDetails,
    setNotifierState,
    setTriggerDownload,
    handleNotifierClose,
    handleEmailNotifierClose,
  } = useNavMobile();
  return (
    <div
      className="w-full h-full flex flex-col transition transform shadow-lg ring-1 
    dark:ring-neutral-700 bg-white dark:bg-neutral-800  dark:divide-neutral-800 
    drawer-container"
    >
      {/* Drawer Header Section */}
      <div
        className="flex flex-col border-b 
      dark:border-neutral-700 text-neutral-700 
      dark:text-neutral-300 text-sm px-3 relative py-2 shadow-sm shadow-neutral-200"
      >
        <div className="flex justify-between items-center py-1 px-4">
          <p className="w-fit text-2xl font-medium">
            Wishlist{" "}
            <span className="light:text-primary-500 dark:text-white-500">
              ({savedProviderList?.length})
            </span>{" "}
          </p>
          <div className="absolute flex justify-end items-center top-3 right-6 z-10">
            {triggerDownload && (
              <BlobProvider
                document={
                  <ReportTemplate
                    currentDateTime={currentDateTime}
                    savedProviderDetails={savedProviderList || []}
                    logo={logoImg.src}
                    caretype={servicesTag ?? ""}
                  />
                }
              >
                {({ blob, url, loading, error }) => {
                  useEffect(() => {
                    if (loading) return;
                    if (error) {
                      console.error("Error generating PDF:", error);
                      setTriggerDownload(false);
                      setNotifierState(true);
                      setNotifierDetails({
                        message:
                          StatusMessages.ErrorMessage.ReportTemplateError,
                        mode: "error",
                      });
                      return;
                    }
                    if (blob && triggerDownload) {
                      const link = document.createElement("a");
                      link.href = URL.createObjectURL(blob);
                      link.download = "Spot Care Providers.pdf";
                      link.click();
                      setTriggerDownload(false);
                      setNotifierState(true);
                      setNotifierDetails({
                        message:
                          StatusMessages.SuccessMessages
                            .WishlistPDFToastMessage,
                        mode: "success",
                      });
                    }
                  }, [blob, loading, error, triggerDownload]);

                  return null;
                }}
              </BlobProvider>
            )}
          </div>
        </div>
        {/* Close Button */}
        <span className="absolute right-3 top-3">
          <ButtonClose onClick={handleCloseDrawer} sizes="size-6" />
        </span>
      </div>
      {/* Notifier Section */}
      <div className="px-4">
        <NotifierSection
          NotifierState={notifierState}
          NotifierDetails={NotifierDetails}
          handleNotifierClose={handleNotifierClose}
          margin="mt-4"
        />
        <NotifierSection
          NotifierState={emailNotifierState}
          NotifierDetails={emailNotifierDetails}
          handleNotifierClose={handleEmailNotifierClose}
          margin="mt-4"
        />
      </div>
      {/* Drawer content */}
      <div ref={drawerRef} className="flex-grow overflow-y-auto scrollbar-hide">
        <div className="flex flex-col h-full gap-y-2 px-4 pt-4">
          {isEmailDialogOpen && (
            <EmailProviders
              emailDialogOpen={isEmailDialogOpen}
              setEmailDialogOpen={setEmailDialogOpen}
              setEmailNotifierState={setEmailNotifierState}
              setEmailNotifierDetails={setEmailNotifierDetails}
            />
          )}
          {savedProviderList &&
            savedProviderList.length > 0 &&
            savedProviderList.map((provider, index) => (
              <div key={index}>
                <ProviderCard data={provider} fromDrawer={true} />
              </div>
            ))}
        </div>
      </div>
      <ButtonGroup props={buttonGroupVal} />
    </div>
  );
};

export default NavMobile;
