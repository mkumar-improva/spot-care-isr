"use client";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import useOtpInput from "@/hooks/auth/use-otp-input";
import React, { FC } from "react";
import NotifierSection from "@/components/ui/Notifier/notifier-section";

interface OTPInputProps {
  onSubmit: (otp: string) => void;
  onResendClick?: () => void;
  loading: boolean;
  errorDetails: string;
  notifierMode: "error" | "success" | "warning";
  email: string;
  heading?: string;
  description?: string;
  isEmptyFieldsError?: boolean;
  NotifierClose?: () => void;
}

const OtpInput: FC<OTPInputProps> = ({
  onSubmit,
  loading,
  onResendClick,
  errorDetails,
  email,
  notifierMode,
  heading = "Almost done",
  description = "Enter the verification code sent to",
  isEmptyFieldsError = false,
  NotifierClose,
}) => {
  const {
    otp,
    inputRefs,
    timer,
    resendEnabled,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleResend,
    handler,
  } = useOtpInput({ onSubmit, onResendClick });

  return (
    <div
      className="lg:min-w-96 w-full flex flex-col items-start justify-start py-[11px] gap-[.75rem]"
      data-nc-id="OTPInput"
    >
      {/* Otp header */}
      <div className="w-full flex flex-col items-start justify-start gap-[.5rem]">
        <h3 className="text-2xl ms:text-[32px] font-medium text-left">
          {heading}
        </h3>
        <h4 className="font-normal text-left text-sm ms:text-base text-gray-500 pl-1">
          {description} <span className="font-semibold">{email}</span>
        </h4>
      </div>
      {/* Otp notifier */}
      <NotifierSection
        NotifierState={errorDetails.length > 0}
        NotifierDetails={{
          message: errorDetails,
          mode: notifierMode,
        }}
        handleNotifierClose={NotifierClose || (() => {})}
        margin="my-1"
      />
      {/* Otp Input fields */}
      <form
        onSubmit={handleSubmit}
        onKeyDown={handler}
        className="w-full flex flex-col items-center justify-center md:items-start
       md:justify-start gap-4"
      >
        <div className="w-full flex items-center justify-start ms:justify-center gap-4 xsm:gap-8">
          {otp.map((value, index) => {
            const isEmpty = value === "";
            const shouldHighlight = isEmptyFieldsError && isEmpty;
            return (
              <input
                key={index}
                type="text"
                value={otp[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={1}
                className={`w-12 h-12 text-base text-center border-2 rounded-lg focus:border-primary-300  
                    focus:ring-opacity-50 bg-white dark:bg-neutral-900 text-[1.2rem] font-semibold text-neutral-900 dark:text-neutral-100 ${
                      shouldHighlight
                        ? "border-red-500 focus:border-red-500 focus:ring-0"
                        : otp[index]
                        ? "border-primary-300"
                        : "border-gray-300"
                    }`}
              />
            );
          })}
        </div>
        {/* OTP Submit Button */}
        <div className="w-full flex flex-col items-start justify-start gap-2 mt-[.5rem]">
          <ButtonPrimary
            type="submit"
            loading={loading}
            className="w-full bg-primary-700 font-medium text-white rounded-lg px-6 py-2 text-base hover:bg-primary-800 transition-colors duration-200 ease-in-out"
          >
            Verify
          </ButtonPrimary>
          <div className="w-full text-sm text-gray-500 text-center pb-[11px]">
            Didn't receive the code?{" "}
            <span
              className={`text-primary-500 hover:underline cursor-pointer font-normal ${
                resendEnabled ? "" : "pointer-events-none opacity-50"
              }`}
              onClick={resendEnabled ? handleResend : undefined}
            >
              Resend{" "}
              <span className="inline-block w-[20px] text-center">
                {timer > 0 && `(${timer})`}
              </span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpInput;
