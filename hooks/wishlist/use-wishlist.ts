"use client";
import { useCallback, useState } from "react";
import { AUTH_KEYS } from "@/constants/KeyConstants";
import { Services } from "@/services/service";
import useAuthDataStore from "@/store/data/use-auth-data-store";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import useLoadingState from "@/store/loader/loding-state";
import useProviderListDataStore from "@/store/data/use-provider-list-data-store";
import { parseProviderResults } from "@/contains/makers";
import { Providers } from "@/types/provider-details";
import { WishlistType } from "@/types/wishlist-type";
import useCommonUiStore from "@/store/ui/common-ui-store";

const useWishlist = () => {
  //store
  const { isLoggedIn } = useAuthUIStore();
  const { setIsWishlistLoaded } = useLoadingState();
  const { userDetail } = useAuthDataStore();
  const { savedProviderList, setSavedProviderList } =
    useProviderListDataStore();
  const { isTouchDevice } = useCommonUiStore();

  //state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //callbacks
  const loadWishlist = useCallback(async () => {
    if (!isLoggedIn) {
      setSavedProviderList([]);
      return;
    }
    setIsWishlistLoaded(true);

    const filterData = {
      radius: "20",
      lat: 40.7127753,
      lon: -74.0059728,
      careType: "Skilled Nursing",
      page: 1,
      pageSize: 1000,
      postalCode: "0",
    };

    try {
      const customerId =
        userDetail?.id ||
        parseInt(localStorage.getItem(AUTH_KEYS.USERID) || "0");
      const result = await Services.GetWishlist(customerId);
      if (result && result.length > 0) {
        const wishlist: Providers[] = result.map(
          (e: WishlistType) => e.provider
        );
        const wishlistResult = await parseProviderResults(wishlist, filterData);
        setSavedProviderList(wishlistResult);
      } else {
        setSavedProviderList([]);
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setIsWishlistLoaded(false);
    }
  }, [isLoggedIn, userDetail?.id, setIsWishlistLoaded, setSavedProviderList]);

  //handlers
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return {
    loadWishlist,
    savedProviderList,
    isTouchDevice,
    isDrawerOpen,
    setIsDrawerOpen,
    handleCloseDrawer,
  };
};

export default useWishlist;
