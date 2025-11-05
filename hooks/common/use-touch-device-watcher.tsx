"use client";
import React, { useEffect } from "react";
import useCommonUiStore from "@/store/ui/common-ui-store";

const UseTouchDeviceWatcher = () => {
  //store
  const { setIsTouchDevice } = useCommonUiStore();

  useEffect(() => {
    const detectTouch = () =>
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    setIsTouchDevice(detectTouch());

    // Hybrid device mode switching (Surface, convertible laptops)
    const handlePointer = () => setIsTouchDevice(detectTouch());
    window.addEventListener("pointerdown", handlePointer);

    return () => window.removeEventListener("pointerdown", handlePointer);
  }, [setIsTouchDevice]);

  return null;
};

export default UseTouchDeviceWatcher;
