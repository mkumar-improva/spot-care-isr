"use client";
import React, { FC } from "react";
import { pageListServerProps } from "../Component";
import PageListHeader from "./page-list-header";
import useProviderList from "@/hooks/list/use-provider-list";
import useProviderListDataStore from "@/store/data/use-provider-list-data-store";
import NoProvidersContainerProps from "@/components/ui/no-providers/no-providers-conainer";
import ProviderCard from "@/components/ui/provider-card/provider-card";
import { HealthCardSkeleton } from "@/components/providers/provider-car-schema-loader";
import GMap from "@/components/ui/g-map/g-map";
import Pagination from "./pagination";
import Loading from "@/components/ui/Loader/Loading";

const PageList: FC<pageListServerProps> = ({
  providersList = [],
  total = 0,
  filterData,
}) => {
  //hooks
  const {
    listinContainerRef,
    NorecordContainerRef,
    currentHoverID,
    loading,
    totalRecords,
    isTabFiltersOpen,
    navigatingCode,
    setIsTabFiltersOpen,
    setCurrentHoverID,
    handleProviderClick,
    listHeaderHeight,
  } = useProviderList({
    providersList,
    total,
    filterData,
  });

  //store
  const { filteredPaginatedList } = useProviderListDataStore();

  return loading ? (
    <div className="w-full h-screen flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <div className="w-full min-h-screen relative flex flex-col items-start justify-start pb-[2rem]">
      <div
        style={{ top: `${listHeaderHeight}px` }}
        className="sticky z-[10] py-4 bg-white w-full pl-4 xl:pl-[2.4rem] pr-4 lg:pr-[.25rem]"
      >
        <PageListHeader
          totalCount={totalRecords}
          isTabFiltersOpen={isTabFiltersOpen}
          setIsTabFiltersOpen={setIsTabFiltersOpen}
        />
      </div>
      <div className="w-full flex items-start justify-start gap-[.5rem] pl-4 xl:pl-[2.4rem] pr-4 lg:pr-[.25rem]">
        <div
          ref={listinContainerRef}
          className="flex flex-col w-full lg:w-[60%] h-full relative gap-[.25rem]"
        >
          <div className="w-full flex flex-col gap-3">
            {filteredPaginatedList && filteredPaginatedList.length > 0 ? (
              filteredPaginatedList.map((item, index) => (
                <div
                  key={index}
                  onMouseEnter={() => {
                    setCurrentHoverID((_) => item.code);
                  }}
                  onMouseLeave={() => {
                    setCurrentHoverID((_) => -1);
                  }}
                  className="cursor-pointer transition-all hover:shadow-lg rounded-2xl overflow-hidden"
                >
                  {navigatingCode === item.code ? (
                    <HealthCardSkeleton />
                  ) : (
                    <ProviderCard
                      data={item}
                      navigating={false}
                      handleProviderClick={handleProviderClick}
                    />
                  )}
                </div>
              ))
            ) : (
              <NoProvidersContainerProps
                NoRecordsContainerRef={NorecordContainerRef}
              />
            )}
          </div>
          <div className="flex items-center justify-center pb-[1rem] pt-[.75rem]">
            <Pagination className="opacity-100 max-h-[100px]" pageCount={10} />
          </div>
        </div>
        <div
          className="w-[50%] lg:w-[40%] h-screen overflow-hidden sticky 
        top-[9.25rem] pr-[.25rem] 2xl:pr-[2.5rem] hidden lg:block"
        >
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <GMap
              paginatedList={filteredPaginatedList}
              selectedId={currentHoverID}
              latLng={{
                lat: filterData?.lat || 40.7127753,
                lng: filterData?.lon || -74.0059728,
              }}
              recenterClassName="top-5 right-[1.5rem] xl:right-[3rem] mr-[2.5rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageList;
