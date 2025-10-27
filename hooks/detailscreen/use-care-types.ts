"use client";

import { useState, useEffect } from "react";
import { Services } from "@/services/service";
import useCareTypeStore from "@/store/detailscreen/care-type-store";
import { Cares } from "@/types/care-types";

export const useCareTypes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { careTypes, setCareTypes } = useCareTypeStore();

  useEffect(() => {
    const fetchCareTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await Services.LoadCareTypes();
        if (response?.cares) {
          setCareTypes(response.cares);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to fetch care types");
        setError(error);
        console.error("Error fetching care types:", error);
      } finally {
        setLoading(false);
      }
    };

    if (careTypes.length === 0) {
      fetchCareTypes();
    } else {
      setLoading(false);
    }
  }, []);

  return {
    careTypes,
    loading,
    error,
  };
};
