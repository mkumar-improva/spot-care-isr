"use client";
import React, { FC, useEffect } from "react";
import TextField from "@/components/ui/TextField/TextField";
import useEmailForm from "@/hooks/header/use-email-providers";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import ButtonSecondary from "@/components/ui/button/types/button-secondary";
import { BlobProvider } from "@react-pdf/renderer";
import ReportTemplate from "@/components/ui/template/report-template";
import logoImg from "@/assets/app/spot/full.png";
import { StatusMessages } from "@/constants/StatusMessages";
import { NotifierModel } from "@/types/notifier-model";

interface EmailProvidersProps {
  emailDialogOpen: boolean;
  setEmailDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailNotifierState: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailNotifierDetails: React.Dispatch<React.SetStateAction<NotifierModel>>;
}

const EmailProviders: FC<EmailProvidersProps> = ({
  emailDialogOpen,
  setEmailDialogOpen,
  setEmailNotifierState,
  setEmailNotifierDetails,
}) => {
  const {
    formData,
    formErrors,
    isEmailSent,
    servicesTag,
    savedProviderList,
    currentDateTime,
    handleInputChange,
    sendEmail,
    handleClose,
    onEmailSubmit,
  } = useEmailForm({
    emailDialogOpen,
    setEmailDialogOpen,
    setEmailNotifierState,
    setEmailNotifierDetails,
  });

  return (
    <form
      className="w-full  flex flex-col rounded-2xl md:shadow-lg border border-transparent 
        md:border-gray-200  md:px-6 pb-4 md:py-6 gap-4"
      onSubmit={onEmailSubmit}
    >
      <p className="text-base text-neutral-500 font-normal text-left">
        Please provide the details below to email your saved providers
      </p>
      <div className="w-full flex flex-col items-start justify-start">
        <div className="w-full flex flex-col items-start justify-start gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
          <div className="w-full sm:flex-1">
            <TextField
              name="firstName"
              label="First name"
              placeHolder=" "
              value={formData.firstName}
              className="text-left"
              required={false}
              error={formErrors.firstName}
              onChange={handleInputChange("firstName")}
              autoFocus
            />
          </div>
          <div className="w-full sm:flex-1">
            <TextField
              name="lastName"
              label="Last name"
              placeHolder=" "
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              className="text-left"
              required={false}
              error={formErrors.lastName}
            />
          </div>
        </div>
      </div>
      <TextField
        label="Email"
        placeHolder=" "
        error={formErrors.email}
        value={formData.email}
        onChange={handleInputChange("email")}
        className="text-left"
        required={false}
      />
      {/* Email provider button */}
      <div className="w-full flex flex-row justify-between items-center mt-[.35rem]">
        <ButtonSecondary onclick={handleClose}>Cancel</ButtonSecondary>
        {isEmailSent && (
          <BlobProvider
            document={
              <ReportTemplate
                currentDateTime={currentDateTime}
                savedProviderDetails={savedProviderList || []}
                logo={logoImg.src}
                caretype={servicesTag ?? "Skilled Nursing"}
              />
            }
          >
            {({ blob, url, loading, error }) => {
              // Handle the different states without using useEffect
              useEffect(() => {
                if (loading) return;

                if (error) {
                  setEmailNotifierState(true);
                  setEmailNotifierDetails({
                    message: StatusMessages.ErrorMessage.LoadingDocument,
                    mode: "error",
                  });
                  return;
                }

                if (blob && isEmailSent) {
                  sendEmail(blob);
                }
              }, [blob, loading, error, isEmailSent]);

              return null;
            }}
          </BlobProvider>
        )}
        <ButtonPrimary
          type="submit"
          loading={isEmailSent}
          disabled={isEmailSent}
        >
          Send
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default EmailProviders;
