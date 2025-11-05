"use client";

import { useState, useEffect } from "react";
import { Services } from "@/services/service";
import { StatusMessages } from "@/constants/StatusMessages";
import { KEYS } from "constants/KeyConstants";
import useReportProviderDialogStore from "@/store/dialog/report-provider-store";

export const useReportProviderDialog = () => {
  const {
    showReportDialog,
    setShowReportDialog,
    dialogProviderName,
    dialogProviderCode,
    reportOptions,
    setReportOptions,
    setSuccessDialogOpen
  } = useReportProviderDialogStore();

  // Form state
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isEmptyReport, setIsEmptyReport] = useState<boolean>(false);
  const [reportValue, setReportValue] = useState<string>("");
  const [reportIssueLoader, setReportIssueLoader] = useState(false);
  const [isDarkUi, setIsDarkUi] = useState(false);

  // Load report options on mount
  useEffect(() => {
    const loadReportOptions = async () => {
      try {
        const result = await Services.GetReportOptions();
        // console.log("Report options result:", result);

        // Handle different response formats
        let optionsArray: Array<{ id: number; category: string }> = [];
        if (Array.isArray(result)) {
          optionsArray = result;
        } else if (result?.data && Array.isArray(result.data)) {
          optionsArray = result.data;
        } else if (typeof result === "object" && result !== null) {
          const foundArray = Object.values(result).find((val) =>
            Array.isArray(val)
          );
          optionsArray =
            (foundArray as
              | Array<{ id: number; category: string }>
              | undefined) ?? [];
        }

        if (optionsArray.length > 0) {
          setReportOptions(optionsArray);
        }
      } catch (error) {
        console.error("Failed to load report options:", error);
      }
    };

    loadReportOptions();
  }, [setReportOptions]);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkUi(isDark);
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    // Reset errors before validation
    setIsError(false);
    setIsEmptyReport(false);

    // Validate if option is selected
    if (!selectedOptionId) {
      setIsError(true);
      return false;
    }

    // Validate "Other" category text input
    const selectedOption = reportOptions.find((e) => e.id === selectedOptionId);
    if (selectedOption?.category === "Other") {
      if (!reportValue || reportValue.trim() === "") {
        setIsEmptyReport(true);
        return false;
      }
    }

    return true;
  };

  const saveReport = async () => {
    if (!validateForm()) {
      return;
    }

    setReportIssueLoader(true);

    try {
      await Services.SaveReport(
        dialogProviderCode || "",
        selectedOptionId ?? 0,
        reportValue ?? ""
      );
      handleClose();
      setSuccessDialogOpen(true);
    } catch (error) {
      console.error("Error saving report:", error);
      setIsError(true);
    } finally {
      setReportIssueLoader(false);
    }
  };

  const handleClose = () => {
    setReportValue("");
    setSelectedOptionId(null);
    setIsError(false);
    setIsEmptyReport(false);
    setShowReportDialog(false);
  };

  // Handle keyboard Enter key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && showReportDialog) {
        const activeElement = document.activeElement as HTMLElement;
        const isInsideDialog = activeElement?.closest(
          "[data-nc-id='ReportIssue']"
        );

        if (isInsideDialog) {
          e.preventDefault();
          saveReport();
        }
      }
    };

    if (showReportDialog) {
      window.addEventListener("keydown", handler);
    }
    return () => window.removeEventListener("keydown", handler);
  }, [selectedOptionId, reportValue, showReportDialog, saveReport]);

  return {
    // Dialog state
    showReportDialog,
    setShowReportDialog,
    dialogProviderName,
    dialogProviderCode,
    reportOptions,

    // Form state
    selectedOptionId,
    setSelectedOptionId,
    reportValue,
    setReportValue,
    isError,
    setIsError,
    isEmptyReport,
    setIsEmptyReport,
    reportIssueLoader,
    isDarkUi,

    // Handlers
    saveReport,
    handleClose,
    validateForm,
  };
};
