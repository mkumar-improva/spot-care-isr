import { Filters } from "@/types/filter-props";
import PageListClient from "./Component.Client";
import { Providers } from "@/types/provider-details";
import React, { FC } from "react";
import Loading from "@/components/ui/Loader/Loading";

export interface pageListServerProps {
  providersList: Providers[];
  total: number;
  filterData: Filters;
}

const PageListServer: FC<pageListServerProps> = ({
  providersList = [],
  total = 0,
  filterData,
}) => {
  return (
    <PageListClient
      providersList={providersList}
      total={total}
      filterData={filterData}
    />
  );
};

export default PageListServer;
