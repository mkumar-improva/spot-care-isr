"use client";

import { useState, useEffect } from "react";
import { Providers } from "@/types/provider-details";
import { Cares } from "@/types/care-types";
import careTypePresent from "@/utils/care-type-present";

interface UseBreadcrumbServiceProps {
  data: Providers | null | undefined;
  careTypes: Cares[];
}

export const useBreadcrumbService = ({ data, careTypes }: UseBreadcrumbServiceProps) => {
  const [servicesTag, setServicesTag] = useState("");

  useEffect(() => {
    if (data?.services && careTypes.length > 0 && !servicesTag) {
      const defaultService = data.services.find((profile) =>
        careTypePresent(profile, careTypes)
      );
      if (defaultService) {
        setServicesTag(defaultService);
      }
    }
  }, [data, careTypes]);

  const getServiceName = () => {
    if (servicesTag) {
      return servicesTag;
    }
    return (
      data?.services?.find((profile) => careTypePresent(profile, careTypes)) || ""
    );
  };

  return {
    servicesTag,
    setServicesTag,
    serviceName: getServiceName(),
  };
};
