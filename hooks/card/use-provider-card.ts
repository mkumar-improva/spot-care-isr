"use client";
import React, { useState, useEffect } from "react";
import { Providers } from "@/types/provider-details";
import useProviderListDataStore from "@/store/data/use-provider-list-data-store";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import useAuthDataStore from "@/store/data/use-auth-data-store";
import { AUTH_KEYS } from "@/constants/KeyConstants";
import { AuthHelper } from "@/utils/auth-helper";
import { AddWishlist } from "@/types/add-wish-list";
import { Services } from "@/services/service";

interface useProviderCardProps {
  provider: Providers;
}

const useProviderCard = ({ provider }: useProviderCardProps) => {
  //store
  const { savedProviderList, setSavedProviderList } =
    useProviderListDataStore();
  const { isLoggedIn, setShowLogin } = useAuthUIStore();
  const { userDetail } = useAuthDataStore();

  //state
  const [isSelected, setIsSelected] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  //constants
  const shouldShowReviews = provider.agrReview || provider.rating;
  const ratingToShow = provider.agrReview?.reviews.rating;

  //useEffects
  useEffect(() => {
    const isProviderSelected =
      savedProviderList?.some((profile) => profile.code === provider.code) ??
      false;
    setIsSelected(isProviderSelected);
  }, [savedProviderList, provider, isSelected]);

  //handlers
  const savedProviders = async () => {
    const loggedIn =
      isLoggedIn ?? localStorage.getItem(AUTH_KEYS.ISLOGGEDIN) === "true";

    // Authentication gate
    if (!loggedIn) {
      AuthHelper.clearSession();
      setShowLogin(true);
      return;
    }

    const customerId =
      userDetail?.id ??
      parseInt(localStorage.getItem(AUTH_KEYS.USERID) || "0", 10);

    const exists = savedProviderList?.some((p) => p.code === provider.code);

    // Add to wishlist
    if (!exists && !isSelected) {
      const updatedList = [...(savedProviderList ?? []), provider];
      setSavedProviderList(updatedList);

      await Services.AddWishlist({
        customerId,
        providerId: provider.id,
        providercode: provider.code,
        serviceTag: provider.services?.[0] ?? "",
      });

      return;
    }

    // Remove from wishlist
    if (exists && isSelected) {
      const updatedList = savedProviderList.filter(
        (p) => p.code !== provider.code
      );
      setSavedProviderList(updatedList);

      await Services.DeleteWishlist(provider.code, customerId);
    }
  };

  return {
    isSelected,
    isTouchDevice,
    shouldShowReviews,
    ratingToShow,
    savedProviders
  };
};

export default useProviderCard;
