"use client";

import { useState, useEffect } from "react";
import uiUseStore from "@/store/detailscreen/ui-store";
import { useCareTypes } from "@/hooks/detailscreen";
import careTypePresent from "@/utils/care-type-present";

export const useConsultingService = () => {
  const { selectedProviderDetail, servicesTag } = uiUseStore();
  const { careTypes } = useCareTypes();
  const [serviceType, setServiceType] = useState<string>("");

  useEffect(() => {
    if (servicesTag) {
      setServiceType(servicesTag);
    } else {
      const filteredServices =
        selectedProviderDetail?.services?.filter((service: string) =>
          careTypePresent(service, careTypes)
        ) || [];

      setServiceType(filteredServices[0] || "");
    }
  }, [servicesTag, selectedProviderDetail?.services, careTypes]);

  return {
    serviceType,
  };
};
