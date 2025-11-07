"use client";

import { useCallback } from "react";
import consultantStore from "@/store/detailscreen/consultingtab/consultant-store";

interface UseConsultingNavigationProps {
  validateCurrentStep: (stepIndex: number) => boolean;
  onSuccess?: () => void;
}

export const useConsultingNavigation = ({
  validateCurrentStep,
  onSuccess,
}: UseConsultingNavigationProps) => {
  const { 
    activeFormIndex, 
    setActiveFormIndex, 
    resetForm 
  } = consultantStore();

  const handlePreviousClick = useCallback(() => {
    if (activeFormIndex > 0) {
      setActiveFormIndex(activeFormIndex - 1);
    }
  }, [activeFormIndex, setActiveFormIndex]);

  const handleNextClick = useCallback(() => {
    const isValid = validateCurrentStep(activeFormIndex);
    if (isValid) {
      setActiveFormIndex(activeFormIndex + 1);
    }
  }, [activeFormIndex, validateCurrentStep, setActiveFormIndex]);

  const handleSubmitClick = useCallback(() => {
    const isValid = validateCurrentStep(activeFormIndex);
    if (isValid) {
      setActiveFormIndex(activeFormIndex + 1);
      onSuccess?.();
    }
  }, [activeFormIndex, validateCurrentStep, setActiveFormIndex, onSuccess]);

  const handleCloseSuccess = useCallback(() => {
    resetForm();
    setActiveFormIndex(0);
  }, [resetForm, setActiveFormIndex]);

  return {
    activeFormIndex,
    handlePreviousClick,
    handleNextClick,
    handleSubmitClick,
    handleCloseSuccess,
  };
};
