"use client";
import { FC, use } from "react";
import ButtonClose from "@/components/ui/button/types/button-close";
import Image from "next/image";
import care from "@/assets/banners/care.png";
import ResetPasswordForm from "./components/reset-password";
import useResetPasswordUIStore from "@/store/ui/reset-password-ui-store";

interface ResetPasswordProps {
  className?: string;
}

const ResetPasswordComponent: FC<ResetPasswordProps> = ({ className = "" }) => {
  const { setShowResetPassword } = useResetPasswordUIStore();
  return (
    <div className={`rounded-xl flex ${className}`}>
      <div className="w-screen xs:w-[18rem] xsm:w-[21rem] ms:w-[25rem] sm:w-[30rem] md:w-[50rem] lg:w-[70rem] rounded-lg  flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2  rounded-l-lg flex-col justify-center rounded-xl">
          <div className="relative w-full h-full rounded-xl">
            <Image
              src={care}
              className="w-full h-full object-cover rounded-xl"
              alt="Healthcare Image"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"></div>
          </div>
        </div>
        {/* Right Side */}
        <ResetPasswordForm />
      </div>
      {/* Close Button */}
      <span className="absolute right-3 top-3">
        <ButtonClose
          sizes="size-6"
          onClick={() => setShowResetPassword(false)}
        />
      </span>
    </div>
  );
};

export default ResetPasswordComponent;
