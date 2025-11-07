"use client";
import { FC } from "react";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import Image from "next/image";

export interface SuccessDialogProps {
  img?: string;
  content?: string;
  contentToBold?: string;
  onClick: () => void;
  btnString?: string;
  dialogWidth?: string;
}

const SuccessDialog: FC<SuccessDialogProps> = ({
  img = "",
  content = "",
  contentToBold = "",
  onClick = () => {},
  btnString = "",
  dialogWidth = "",
}) => {
  return (
    <>
      <div
        className={`${dialogWidth} flex flex-col text-neutral-700 dark:text-neutral-300 justify-center items-center gap-y-6 px-6 py-6`}
      >
        <Image height={100} width={100} src={img} alt="" />
        <p className="text-base font-normal text-center max-w-sm break-words">
          {content} <br />
          <span className="font-normal">{contentToBold}</span>
        </p>
        <div className="w-full flex flex-row justify-center items-center">
          <ButtonPrimary onclick={onClick}>{btnString}</ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default SuccessDialog;
