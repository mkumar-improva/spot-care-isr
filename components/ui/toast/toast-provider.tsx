"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster containerStyle={{ zIndex: 9999999999 }} reverseOrder={false} />
  );
};
