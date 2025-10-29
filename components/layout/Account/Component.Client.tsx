"use client";

import React from "react";
import { Helmet } from "react-helmet";
import Loading from "@/components/ui/Loader/Loading";
import RenderSidebar from "./components/render-sidebar";
import RenderSection from "./components/render-section";
import { useAccount } from "@/hooks/account/use-account";
import Lottie from "lottie-react";
import NoRecords from "@/assets/Lottie/NoRecords.json";
import Heading from "@/components/ui/Heading/Heading";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: React.FC<AccountPageProps> = ({ className = "" }) => {
  const { loadProfile, hasUserData, logout, userDetail } = useAccount();

  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>Spot.care | Profile</title>
      </Helmet>
      
      {loadProfile ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loading />
        </div>
      ) : hasUserData ? (
        <div className="w-full max-w-screen-2xl flex flex-col lg:flex-row relative gap-[2.5rem] md:gap-[1rem] h-full py-[4rem] px-4 md:px-[4rem] xl:px-[8rem] 2xl:px-[14rem] mx-auto">
          <div className="block flex-grow">
            <div className="lg:sticky lg:top-24">
              <RenderSidebar />
            </div>
          </div>
          <div className="w-full lg:w-3/5 xl:w-2/3 flex-shrink-0 h-fit">
            <RenderSection onLogout={logout} />
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col h-[88vh] max-w-full items-center justify-center">
          <div className="w-96 h-96 -mt-32">
            <Lottie animationData={NoRecords} loop={true} />
          </div>
          <Heading
            desc="We couldn't load your account details. Please try again later."
            className="text-center"
          >
            Unable to Load Account
          </Heading>
        </div>
      )}
    </div>
  );
};

export default AccountPage;