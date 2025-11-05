"use client";
import PageList from "./components/page-list";
import React, { FC, useEffect, useState, Suspense } from "react";
import { pageListServerProps } from "./Component";
import { useInitializeSearchFromUrl } from "@/hooks/search/use-initialize-search-from-url";

/**
 * Inner component that uses useSearchParams (requires Suspense wrapper)
 */
const PageListWithSearchInit: FC<pageListServerProps> = ({
  providersList = [],
  total = 0,
  filterData,
}) => {
  // Initialize search store with URL query parameters
  useInitializeSearchFromUrl();

  return (
    <PageList
      providersList={providersList}
      total={total}
      filterData={filterData}
    />
  );
};

/**
 * Wrapper component with Suspense for useSearchParams hook
 */
const PageListClient: FC<pageListServerProps> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageListWithSearchInit {...props} />
    </Suspense>
  );
};

export default PageListClient;
