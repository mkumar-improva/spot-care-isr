"use client";

import { useEffect } from "react";
import { Providers } from "@/types/provider-details";
import uiUseStore from "@/store/detailscreen/ui-store";

interface UseDetailScreenSyncProps {
  data: Providers | null | undefined;
  servicesTag: string;
}

export const useDetailScreenSync = ({ data, servicesTag }: UseDetailScreenSyncProps) => {
  const { setSelectedProviderDetail, setServicesTag: setStoreServicesTag } = uiUseStore();

  // Sync provider data to store
  useEffect(() => {
    if (data) {
      setSelectedProviderDetail(data);
    }
  }, [data, setSelectedProviderDetail]);

  // Sync services tag to store
  useEffect(() => {
    if (servicesTag) {
      setStoreServicesTag(servicesTag);
    }
  }, [servicesTag, setStoreServicesTag]);
};
