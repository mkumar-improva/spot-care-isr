"use client";

import { usePathname } from "next/navigation";
import HeaderNav from "./components/header-nav";
import React, { use, useEffect } from "react";
import useHeaderUiStore from "store/ui/header-ui-store";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import useWishlist from "@/hooks/wishlist/use-wishlist";

const StandardHeader = () => {
  const pathName = usePathname();
  const { setIsHomePage } = useHeaderUiStore();
  const { isLoggedIn } = useAuthUIStore();

  //hooks
  const { loadWishlist } = useWishlist();

  useEffect(() => {
    const nonHomeRoutes = [
      "/list",
      "/detail-screen",
      "/contact",
      "/privacy",
      "/account",
      "/terms",
      "/provider-listing",
      "/addProvider",
      "/provider-profile",
    ];

    setIsHomePage(!nonHomeRoutes.includes(pathName));
  }, [pathName]);

  useEffect(() => {
    loadWishlist();
  }, [isLoggedIn]);

  const pathname = usePathname();
  const isBlogPage = pathname === "/blog";

  if (isBlogPage) return null;

  return (
    <div className="w-full sticky top-0 z-40">
      <HeaderNav />
    </div>
  );
};

export default StandardHeader;
