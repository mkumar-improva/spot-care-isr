"use client";

import React from 'react';
import { useClaimProviderDialog } from '@/hooks/dialog/claim-provider-hook';
import ButtonSecondary from '@/components/ui/button/types/button-secondary';
import ButtonPrimary from '@/components/ui/button/types/button-primary';
import ButtonClose from '@/components/ui/button/types/button-close';
import ClaimStatus from '@/components/dialogs/components/claim-provider/components/claim-status';
import TextField from '@/components/ui/TextField/TextField';
import CustomTextArea from '@/components/ui/CustomTextArea/custom-text-area';
import NotifierSection from '@/components/dialogs/components/claim-provider/components/notifier-section';

const ProviderInfoDialog = () => {
  const {
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
    handleSubmit,
    handleClose,
  } = useClaimProviderDialog();

  return (
    <div className="relative">
      {claimStatus === "none" ? (
        <>
          <div className="flex flex-row text-neutral-700 dark:text-neutral-300 text-center justify-between items-center border-b dark:border-neutral-800 p-4 relative">
            <h2 className="text-2xl font-bold flex-grow">Claim your profile</h2>
            <ButtonClose onClick={handleClose} />
          </div>

          <div className="p-6">
            <p className="text-base text-gray-600 mb-4">
              Please enter your NPI number and provide a reason for this request.
            </p>

            <NotifierSection
              NotifierState={notifierState}
              NotifierDetails={notifierDetails}
              handleNotifierClose={() => setNotifierState(false)}
            />

            {/* NPI Input */}
            <div className="my-3">
              <TextField
                name="npi"
                label="NPI Number"
                value={npi}
                onChange={(e) => {
                  setNpi(e.target.value);
                  if (npiError) setNpiError('');
                }}
                type="text"
                maxLength={10}
                error={npiError}
              />
            </div>

            {/* Reason Input */}
            <div className="my-3">
              <CustomTextArea
                name="reason"
                label="Reason"
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (reasonError) setReasonError('');
                }}
                placeholder="Please explain why you are claiming this profile..."
                error={reasonError}
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between space-x-3">
              <ButtonSecondary onclick={handleClose}>
                Cancel
              </ButtonSecondary>
              <ButtonPrimary 
                onclick={handleSubmit}
                loading={loading}
                disabled={loading || !npi || !reason}
              >
                {loading ? "Submitting..." : "Submit"}
              </ButtonPrimary>
            </div>
          </div>
        </>
      ) : (
        <div className="p-6">
          <ClaimStatus
            status={claimStatus}
            onClick={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default ProviderInfoDialog;