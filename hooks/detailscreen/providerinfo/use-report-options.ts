"use client";

import { useState, useEffect } from "react";
import { Services } from "@/services/service";
import { ReportOption } from "@/types/provider-details";

const useReportOptions = () => {
  const [reportOptions, setReportOptions] = useState<ReportOption[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReportOptions = async () => {
    setLoading(true);
    try {
      const response = await Services.GetReportOptions();
      setReportOptions(response || []);
    } catch (error) {
      console.error("Error fetching report options:", error);
      setReportOptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!reportOptions || reportOptions.length === 0) {
      fetchReportOptions();
    }
  }, []);

  return {
    reportOptions,
    loading,
  };
};

export default useReportOptions;
