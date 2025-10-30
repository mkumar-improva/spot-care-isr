"use client";

import { usePathname } from 'next/navigation';
import HeaderNav from "./components/header-nav";
import React, { use, useEffect } from "react";
import useHeaderUiStore from "store/ui/header-ui-store";

const StandardHeader = () => {
  const pathName = usePathname();
  const { setIsHomePage } = useHeaderUiStore();

  useEffect(() => {
    const nonHomeRoutes = [
      "/list",
      "/details-page",
      "/contact",
      "/privacy",
      "/account",
      "/terms",
      "/provider-listing",
      "/addProvider",
      "/provider-profile",
      "/list"
    ];

    setIsHomePage(!nonHomeRoutes.includes(pathName));
  }, [pathName]);

  const pathname = usePathname();
  const isBlogPage = pathname === '/blog';

  if (isBlogPage) return null;

  return (
    <div className="w-full sticky top-0 z-40">
      <HeaderNav />
    </div>
  );
};

export default StandardHeader;
