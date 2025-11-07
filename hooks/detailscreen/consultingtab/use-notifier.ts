"use client";

import { useState, useCallback } from "react";

export interface NotifierDetails {
  title: string;
  message: string;
  icon: string;
  ctaMessage: string;
}

export interface NotifierState {
  show: boolean;
  details: NotifierDetails | null;
}

const initialNotifierState: NotifierState = {
  show: false,
  details: null,
};

export const useNotifier = () => {
  const [notifier, setNotifier] = useState<NotifierState>(initialNotifierState);

  const showNotifier = useCallback((details: NotifierDetails) => {
    setNotifier({
      show: true,
      details,
    });
  }, []);

  const hideNotifier = useCallback(() => {
    setNotifier(initialNotifierState);
  }, []);

  const handleNotifierClose = useCallback(() => {
    hideNotifier();
  }, [hideNotifier]);

  return {
    notifier,
    showNotifier,
    hideNotifier,
    handleNotifierClose,
  };
};
