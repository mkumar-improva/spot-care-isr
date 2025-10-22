"use client";

import PageContactInfo from "./components/PageContactInfo";
import PageContactFields from "./components/PageContactFields";
import { Helmet } from "react-helmet-async";
import { Config } from "constants/config";
const PageContact = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      {/**Contact Tab */}
      <div
        className="w-full max-w-screen-2xl xl:max-w-screen-2xl mx-auto  px-4 md:px-[4rem] xl:px-[15rem] 
       pt-4 lg:py-[4rem] flex flex-col justify-start items-center"
      >
        {/**Contact Fields and its info */}
        <div className="w-full flex lg:flex-row flex-col justify-between items-start lg:space-x-16 gap-8 pb-8 lg:pb-0">
          {/**Contact Info */}
          <PageContactInfo />
          {/**Contact Fields */}
          <PageContactFields />
        </div>
      </div>
    </div>
  );
};

export default PageContact;
