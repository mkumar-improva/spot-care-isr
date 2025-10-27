"use client";
import { FC } from "react";
import ButtonClose from "@/components/ui/button/types/button-close";
import LoginModule from "./components/login-module";
import Image from "next/image";
import care from "@/assets/banners/care4.png";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import PageSignUp from "./components/page-signup";
import ForgotPassword from "./components/forgot-password";

export interface AuthClientProps {
  className?: string;
}

const AuthClient: FC<AuthClientProps> = ({ className = "" }) => {
  //store
  const {
    showSignup,
    showForgotPassword,
    setShowLogin,
    setShowSignup,
    setShowForgotPassword,
  } = useAuthUIStore();

  //handler
  const handleEvent = () => {
    setShowForgotPassword(false);
    setShowLogin(true);
  };
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
        {showForgotPassword ? (
          <ForgotPassword callback={handleEvent} />
        ) : showSignup ? (
          <PageSignUp />
        ) : (
          <LoginModule />
        )}
      </div>
      {/* Close Button */}
      <span className="absolute right-3 top-3">
        <ButtonClose
          sizes="size-6"
          onClick={() => {
            setShowLogin(false);
            setShowSignup(false);
            setShowForgotPassword(false);
          }}
        />
      </span>
    </div>
  );
};

export default AuthClient;
