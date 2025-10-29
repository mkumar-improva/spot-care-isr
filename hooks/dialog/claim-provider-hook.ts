"use client";

import { useState } from "react";
import { upsertClaimedProvider } from "@/utils/upsertClaimedProviders";
import { KEYS } from "constants/KeyConstants";
import useClaimProviderDialogStore from "@/store/dialog/claim-provide-store";

interface NotifierDetails {
  message: string;
  mode: "error" | "success";
}

export const useClaimProviderDialog = () => {
  const {
    showClaimProvider,
    setShowClaimProvider,
    selectedProviderCode,
    claimedProviders,
    setClaimedProviders,
  } = useClaimProviderDialogStore();

  // Form state
  const [loading, setLoading] = useState(false);
  const [claimStatus, setClaimStatus] = useState<"none" | "approved" | "pending">("none");
  const [npi, setNpi] = useState("");
  const [reason, setReason] = useState("");
  const [npiError, setNpiError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [notifierState, setNotifierState] = useState(false);
  const [notifierDetails, setNotifierDetails] = useState<NotifierDetails>({
    message: "",
    mode: "error",
  });

  const validateForm = (): boolean => {
    let hasError = false;

    // Validate NPI
    if (npi.length !== 10 || !/^\d+$/.test(npi)) {
      setNpiError("Please enter a valid 10-digit NPI number.");
      hasError = true;
    } else {
      setNpiError("");
    }

    // Validate Reason
    if (!reason.trim()) {
      setReasonError("Please provide a reason for your claim request.");
      hasError = true;
    } else if (reason.trim().length < 10) {
      setReasonError("Reason must be at least 10 characters long.");
      hasError = true;
    } else {
      setReasonError("");
    }

    return !hasError;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const userId = localStorage.getItem(KEYS.USERID);
      
      // TODO: Call claim provider service API once ClaimProvider service method is available
      // For now, creating mock response structure
      const claim: any = {
        status: "pending",
        data: {
          provider: selectedProviderCode,
        },
      };

      // Uncomment when Services.ClaimProvider is implemented:
      // const claim: any = await Services.ClaimProvider(
      //   npi,
      //   reason,
      //   selectedProviderCode || "",
      //   parseInt(userId ?? "0")
      // );

      if (claim.status === "fail") {
        setNotifierDetails({
          message: "An error occurred while submitting your claim. Please try again",
          mode: "error",
        });
        setNotifierState(true);
        return;
      }

      const updated = upsertClaimedProvider(
        claimedProviders,
        claim.data.provider,
        claim.status === "approved" ? "approved" : "pending"
      );
      setClaimedProviders(updated);
      setClaimStatus(claim.status === "approved" ? "approved" : "pending");

      if (claim.status === "approved" || claim.status === "pending") {
        setTimeout(() => {
          handleClose();
        }, 3000);
      }
    } catch (error) {
      console.error("Error claiming provider:", error);
      setNotifierDetails({
        message: "An error occurred while submitting your claim. Please try again",
        mode: "error",
      });
      setNotifierState(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setNpiError("");
    setReasonError("");
    setNpi("");
    setReason("");
    setClaimStatus("none");
    setNotifierState(false);
    setShowClaimProvider(false);
  };

  return {
    // Dialog state
    showClaimProvider,
    setShowClaimProvider,
    selectedProviderCode,
    
    // Form state
    loading,
    claimStatus,
    npi,
    setNpi,
    reason,
    setReason,
    npiError,
    setNpiError,
    reasonError,
    setReasonError,
    notifierState,
    setNotifierState,
    notifierDetails,
    
    // Handlers
    handleSubmit,
    handleClose,
  };
};
