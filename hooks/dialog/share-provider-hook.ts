"use client";

import { useState } from "react";
import { NotifierModel } from "@/types/notifier-model";
import useShareProviderDialogStore from "@/store/dialog/share-provider-store";
import useUIStore from "@/store/detailscreen/ui-store";

export const useShareProviderDialog = () => {
  const { showShareDialog, setShowShareDialog } = useShareProviderDialogStore();
  const { selectedProviderDetail } = useUIStore();


  const [notifierState, setNotifierState] = useState(false);
  const [notifierDetails, setNotifierDetails] = useState<NotifierModel>({
    message: "",
    mode: "error",
  });


  const getShareUrl = (): string => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const handleMailToShare = () => {
    const subject = encodeURIComponent("Check out this spot care provider");
    const body = encodeURIComponent(getShareUrl());
    const mailto = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailto, "_blank");
  };

  const handleCopyLink = async () => {
    try {
      const url = getShareUrl();
      await navigator.clipboard.writeText(url);
      setNotifierDetails({
        message: "Copied to clipboard",
        mode: "success",
      });
      setNotifierState(true);

      setTimeout(() => {
        setNotifierState(false);
      }, 3000);
    } catch (err) {
      setNotifierDetails({
        message: "Failed to copy the link",
        mode: "error",
      });
      setNotifierState(true);

      setTimeout(() => {
        setNotifierState(false);
      }, 3000);
      console.error(err);
    }
  };

  const handleNotifierClose = () => {
    setNotifierState(false);
    setNotifierDetails({
      message: "",
      mode: "error",
    });
  };

  const handleClose = () => {
    setShowShareDialog(false);
  };

  return {
    showShareDialog,
    setShowShareDialog,
    selectedProviderDetail,
    notifierState,
    setNotifierState,
    notifierDetails,
    setNotifierDetails,
    handleMailToShare,
    handleCopyLink,
    handleNotifierClose,
    handleClose,
  };
};
