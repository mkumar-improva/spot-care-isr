"use client";

import { useState, useEffect } from "react";
import { Providers } from "@/types/provider-details";
import { Services } from "@/services/service";
import { AddWishlist } from "@/types/add-wish-list";
import { KEYS } from "@/constants/KeyConstants";
import careTypePresent from "@/utils/care-type-present";
import { Cares } from "@/types/care-types";

interface UseWishlistProps {
  selectedProviderDetail: Providers | null;
  careTypes: Cares[];
  userDetail: Record<string, any>;
}

export const useWishlist = ({ 
  selectedProviderDetail, 
  careTypes,
  userDetail 
}: UseWishlistProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [savedProviderList, setSavedProviderList] = useState<Providers[]>([]);

  useEffect(() => {
    const isProviderSelected = savedProviderList
      ? savedProviderList.filter(
          (profile) => profile.name === selectedProviderDetail?.name
        ).length > 0
      : false;

    setIsSelected(isProviderSelected);
  }, [savedProviderList, selectedProviderDetail]);

  const savedProviders = async () => {
    if (!selectedProviderDetail) return;
    
    const isLoggedInCheck = localStorage.getItem(KEYS.ISLOGGEDIN) === "true";
    const servicesTag = selectedProviderDetail?.services.filter((profile) =>
      careTypePresent(profile, careTypes)
    )[0];
    
    if (isLoggedInCheck) {
      const customerId =
        userDetail.id && userDetail.id !== 0
          ? userDetail.id
          : parseInt(localStorage.getItem(KEYS.USERID) || "0", 10);
      
      if (!isSelected) {
        setSavedProviderList(
          savedProviderList.concat(selectedProviderDetail)
        );
        const wishListBody: AddWishlist = {
          customerId: customerId,
          providerId: selectedProviderDetail?.id ?? 0,
          providercode: selectedProviderDetail?.code ?? "",
          serviceTag: servicesTag ?? "",
        };
        await Services.AddWishlist(wishListBody);
      } else {
        setSavedProviderList(
          savedProviderList?.filter(
            (details) => selectedProviderDetail?.name !== details.name
          )
        );
        const dataToDelete = savedProviderList.find(
          (details) => selectedProviderDetail?.name === details.name
        );
        if (dataToDelete) {
          await Services.DeleteWishlist(dataToDelete.code, customerId);
        }
      }
    }
  };

  return {
    isSelected,
    savedProviders,
    savedProviderList,
    setSavedProviderList,
  };
};
