"use client";
import useProviderListDataStore from "@/store/data/use-provider-list-data-store";
import React, { useRef, useState } from "react";
import { buttonGroupProps } from "@/components/ui/button/types/button-group";
import {
  Mail01Icon,
  Download05Icon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import useSearchUiStore from "@/store/ui/search-ui-store";
import { currentDateTimeVal } from "@/utils/date-time";
import { NotifierModel } from "@/types/notifier-model";

const useNavMobile = () => {
  //store
  const { savedProviderList } = useProviderListDataStore();
  const { servicesTag } = useSearchUiStore();

  //refs
  const drawerRef = useRef<HTMLDivElement | null>(null);

  //state
  const [triggerDownload, setTriggerDownload] = useState<boolean>(false);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [notifierState, setNotifierState] = useState(false);
  const [NotifierDetails, setNotifierDetails] = useState<NotifierModel>({
    message: "",
    mode: "error",
  });
  const [emailNotifierState, setEmailNotifierState] = useState<boolean>(false);
  const [emailNotifierDetails, setEmailNotifierDetails] =
    useState<NotifierModel>({
      message: "",
      mode: "error",
    });
  const [isEmailDialogOpen, setEmailDialogOpen] = useState<boolean>(false);

  //handlers
  const openEmailDialog = () => {
    setEmailDialogOpen(true);
  };

  const handleDownloadClick = () => {
    const now = currentDateTimeVal();
    setCurrentDateTime(now);
    setTriggerDownload(true);
  };

  const handleNotifierClose = () => {
    setNotifierState(false);
    setNotifierDetails({
      message: "",
      mode: "error",
    });
  };

  const handleEmailNotifierClose = () => {
    setEmailNotifierState(false);
    setEmailNotifierDetails({
      message: "",
      mode: "error",
    });
  };

  //contants
  const buttonGroupVal: buttonGroupProps[] = [
    {
      fieldName: "Email providers",
      className: `flex-1 py-3 text-center bg-white dark:bg-neutral-900 dark:text-neutral-300  
    ${
      savedProviderList?.length === 0 || isEmailDialogOpen
        ? "cursor-not-allowed"
        : "cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800"
    }`,
      onClick: openEmailDialog,
      icon: Mail01Icon,
      size: 20,
      isDisabled: savedProviderList?.length === 0 || isEmailDialogOpen,
    },
    {
      fieldName: "Download",
      className: `flex-1 py-3 text-center bg-primary-700 text-neutral-50 
      ${
        savedProviderList?.length === 0 || triggerDownload
          ? "cursor-not-allowed"
          : "cursor-pointer hover:bg-primary-800 "
      }`,
      onClick: handleDownloadClick,
      icon: Download05Icon,
      size: 24,
      isDisabled: savedProviderList?.length === 0 || triggerDownload,
      loading: triggerDownload,
    },
  ];

  return {
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
    setNotifierState,
    setNotifierDetails,
    setTriggerDownload,
    handleNotifierClose,
    handleEmailNotifierClose
  };
};

export default useNavMobile;
