import React from 'react';
import { HealthCardSkeleton } from '../../../providers/provider-car-schema-loader';

const Skeleton = ({ className = '' }) => (
  <div
    className={`animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded ${className}`}
  />
);

export const HomePageSkeletonLoader = () => {
  return (
    <div className="pt-1 md:pt-[2rem] lg:pt-0 pb-[2rem] lg:pb-8 px-4 xl:px-[1rem] 2xl:px-[2.8rem] xl:max-w-none">
      <div className="relative flex min-h-screen gap-[1.5rem]">
        {/* List Section */}
        <div className="min-h-screen w-full md:w-full lg:w-[45%] xl:w-[60%] flex-shrink-0">
          {/* Custom Heading Skeleton */}
          <div className="scroll-mt-[120px] mb-6">
            <Skeleton className="h-8 w-96 mb-2 rounded-full" />
            <Skeleton className="h-5 w-64 rounded-full" />
          </div>

          {/* Provider Cards Grid */}
          <div className="grid grid-cols-1 gap-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <HealthCardSkeleton key={item} />
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex mt-[2rem] justify-center items-center">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-[50%] lg:w-[40%] h-screen overflow-hidden sticky top-[88px] pr-[.25rem] 2xl:pr-[2.5rem] hidden lg:block">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <Skeleton className="w-full h-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeletonLoader;
