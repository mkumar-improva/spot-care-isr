"use client";
import PageList from "./components/page-list";
import React, { FC, useEffect, useState } from "react";
import { pageListServerProps } from "./Component";

const PageListClient: FC<pageListServerProps> = ({
  providersList = [],
  total = 0,
  filterData,
}) => {
  
  return (
    <PageList
      providersList={providersList}
      total={total}
      filterData={filterData}
    />
  );
};

export default PageListClient;
