"use client";

import { useState, useEffect } from "react";
import { KEYS } from "@/constants/KeyConstants";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import useUIStore from "@/store/detailscreen/ui-store";
import useReportProviderDialogStore from "@/store/dialog/report-provider-store";
import useShareProviderDialogStore from "@/store/dialog/share-provider-store";
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

  const { setShowLogin } = useAuthUIStore();
  const { selectedProviderDetail } = useUIStore();
  const { setShowShareDialog } = useShareProviderDialogStore();
  const { setShowReportDialog, setDialogProviderCode, setDialogProviderName } =
    useReportProviderDialogStore();

  // For now, check if user is logged in from localStorage
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem(KEYS.ISLOGGEDIN) === "true";

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
        setShowShareDialog(true);
      },
    },
    {
      title: "Report",
      icon: Flag02Icon,
      onclick: () => {
        if (isLoggedIn) {
          setDialogProviderCode(selectedProviderDetail?.code ?? "");
          setDialogProviderName(selectedProviderDetail?.name ?? "");
          setShowReportDialog(true);
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
