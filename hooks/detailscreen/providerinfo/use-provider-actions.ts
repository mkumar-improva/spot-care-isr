"use client";

import { useState, useEffect } from "react";
import providerInfoStore from "@/store/detailscreen/providerinfo/provider-info-store";
import {
  FavouriteStrokeRounded,
  Share08StrokeRounded,
  Flag02Icon,
} from "@hugeicons-pro/core-stroke-rounded/index";

export const useProviderActions = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };

    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);
    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  const {
    isLoggedIn,
    setShowLogin,
    setIsShareDialogOpen,
    setDialogProviderName,
    setDialogProviderCode,
    setIsReportDialogOpen,
    selectedProviderDetail,
  } = providerInfoStore();

  const providerActions = [
    {
      title: "Save",
      isSave: true,
      icon: FavouriteStrokeRounded,
      onclick: () => {},
    },
    {
      title: "Share",
      icon: Share08StrokeRounded,
      onclick: () => {
        setIsShareDialogOpen(true);
      },
    },
    {
      title: "Report",
      icon: Flag02Icon,
      onclick: () => {
        if (isLoggedIn) {
          setDialogProviderCode(selectedProviderDetail?.code ?? "");
          setDialogProviderName(selectedProviderDetail?.name ?? "");
          setIsReportDialogOpen(true);
        } else {
          setShowLogin(true);
        }
      },
    },
  ];

  return {
    isTouchDevice,
    providerActions,
  };
};
