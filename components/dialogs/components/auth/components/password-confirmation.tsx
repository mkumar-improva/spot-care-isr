import { Mail01Icon } from "@hugeicons-pro/core-stroke-rounded/index";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { FC } from "react";
import ButtonSecondary from "@/components/ui/button/types/button-secondary";

interface ConfirmationPopupProps {
  setConfirmationPopup: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPasswordEmail: string;
  callback: () => void;
}

const PasswordConfirmation: FC<ConfirmationPopupProps> = ({
  callback,
  setConfirmationPopup,
  forgotPasswordEmail = "",
}) => {
  return (
    <div className="flex items-center justify-center my-10">
      <div className="rounded-lg  w-full max-w-md text-center">
        <div className="bg-green-100 text-green-600 p-4 rounded-full mx-auto w-32 h-32 flex items-center justify-center">
          <HugeiconsIcon icon={Mail01Icon} className="w-16 h-16" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold ">Check your email</h1>
        {/* Description */}
        <p className="mt-2 text-sm text-neutral-500">
          Please check the email address{" "}
          <span className="font-medium">
            {forgotPasswordEmail} <br />
          </span>{" "}
          for instructions to reset your password.
        </p>

        {/* Resend button */}
        <ButtonSecondary
          className="mt-12 border border-neutral-200 font-medium text-black rounded-lg px-6 py-2 
        text-base hover:bg-neutral-100 transition-colors duration-200 ease-in-out mx-auto"
        >
          Resend Email
        </ButtonSecondary>
        <div
          className={`text-center text-sm mt-4 font-normal text-primary-500 hover:underline cursor-pointer`}
          onClick={callback}
        >
          Back to login
        </div>
      </div>
    </div>
  );
};

export default PasswordConfirmation;
