import { CheckmarkCircle02Icon } from "@hugeicons-pro/core-stroke-standard/index";
import { HugeiconsIcon } from "@hugeicons/react";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import React, { FC } from "react";

interface ResetPasswordConfirmationProps {
  callback: () => void;
}

const ResetPasswordConfirmation: FC<ResetPasswordConfirmationProps> = ({
  callback,
}) => {
  return (
    <div className="flex items-center justify-center my-10">
      <div className="rounded-lg  w-full max-w-md text-center">
        <div className="bg-green-100 text-green-600 p-4 rounded-full mx-auto w-32 h-32 flex items-center justify-center">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-16 h-16" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold ">
          Password reset successful
        </h1>
        {/* Description */}
        <p className="mt-2 text-sm text-neutral-500">
          You can now use your new password to log in to your account
        </p>
        {/* Back to Login button */}
        <ButtonPrimary
          className="w-full mt-12 bg-primary-700 font-medium text-white rounded-lg px-6 py-2 text-base 
        hover:bg-primary-800 transition-colors duration-200 ease-in-out"
          onclick={callback}
        >
          Login
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmation;
