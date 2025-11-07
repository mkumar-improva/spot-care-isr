"use client";

import { useState, useEffect } from "react";
import { Providers } from "@/types/provider-details";
import { Services } from "@/services/service";
import { AddWishlist } from "@/types/add-wish-list";
import { KEYS, AUTH_KEYS } from "@/constants/KeyConstants";
import careTypePresent from "@/utils/care-type-present";
import { Cares } from "@/types/care-types";
import useProviderListDataStore from "@/store/data/use-provider-list-data-store";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import useAuthDataStore from "@/store/data/use-auth-data-store";
import { AuthHelper } from "@/utils/auth-helper";

interface UseWishlistProps {
  selectedProviderDetail: Providers | null;
  careTypes: Cares[];
}

export const useWishlist = ({
  selectedProviderDetail,
  careTypes,
}: UseWishlistProps) => {
  //store
  const { savedProviderList, setSavedProviderList } =
    useProviderListDataStore();
  const { isLoggedIn, setShowLogin } = useAuthUIStore();
  const { userDetail } = useAuthDataStore();

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const isProviderSelected =
      savedProviderList?.some(
        (profile) => profile.code === selectedProviderDetail?.code
      ) ?? false;
    setIsSelected(isProviderSelected);
  }, [savedProviderList, selectedProviderDetail]);

  const savedProviders = async () => {
    if (!selectedProviderDetail) return;
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

    const exists = savedProviderList?.some(
      (p) => p.code === selectedProviderDetail?.code
    );

    const servicesTag = selectedProviderDetail?.services.filter((profile) =>
      careTypePresent(profile, careTypes)
    )[0];

    //Add wishlist
    if (!exists && !isSelected) {
      const updatedList = [
        ...(savedProviderList ?? []),
        selectedProviderDetail,
      ];
      setSavedProviderList(updatedList);
      await Services.AddWishlist({
        customerId,
        providerId: selectedProviderDetail.id,
        providercode: selectedProviderDetail.code,
        serviceTag: servicesTag ?? "",
      });

      return;
    }

    //Remove wishlist
    if (exists && isSelected) {
      const updatedList = savedProviderList.filter(
        (p) => p.code !== selectedProviderDetail.code
      );
      setSavedProviderList(updatedList);
      await Services.DeleteWishlist(selectedProviderDetail.code, customerId);
      return;
    }
  };

  return {
    isSelected,
    savedProviders,
    savedProviderList,
    setSavedProviderList,
  };
};
