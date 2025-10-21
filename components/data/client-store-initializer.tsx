"use client";
import React, { useEffect, FC,useState } from "react";
import { Cares } from "@/types/care-types";
import useSearchDataStore from "store/data/search-data-store";

interface ClientStoreInitializerProps {
  careTypes: Cares[];
}

const ClientStoreInitializerProps: FC<ClientStoreInitializerProps> = ({
  careTypes = [],
}) => {
  const { setCareTypes } = useSearchDataStore();
  const [careTypesInitialized, setCareTypesInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (careTypes && careTypes.length > 0 && !careTypesInitialized) {
      setCareTypes(careTypes);
      setCareTypesInitialized(true);
    }
  }, [careTypes, setCareTypes]);

  return null;
};

export default ClientStoreInitializerProps;
