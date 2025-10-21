"use client";
import { useState, useCallback } from "react";
import customToastStore from "store/ui/custom-toast-store";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  icon?: React.ReactNode;
  description1: string;
  description2?: string;
  toastColor?: ToastType;
}

const useCustomToast = () => {
  const { toasts, showToasts } = customToastStore();

  const showToast = useCallback((toast: Omit<ToastMessage, "id">) => {
    const id = Date.now().toString();
    showToasts([...toasts, { ...toast, id }]);
    setTimeout(() => removeToast(id), 3000); // Auto remove after 4s
  }, []);

  const removeToast = useCallback(
    (id: string) => {
      showToasts(toasts.filter((t) => t.id !== id));
    },
    [toasts]
  );

  return { toasts, showToast, removeToast };
};

export default useCustomToast;
