import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Skeleton = ({ className = '' }) => (
  <div
    className={`animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded ${className}`}
  />
);

export const HealthCardSkeleton = () => {
  return (
    <Card className="nc-StayCardH w-full relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden min-h-[10.75rem]">
      <CardContent className="p-6 pt-6 h-full">
        {/* Title */}
        <Skeleton className="h-5 w-64 mb-4 rounded-full" />
        
        {/* Address row */}
        <div className="flex items-start gap-2 mb-3">
          <Skeleton className="h-4 w-4 mt-0.5 rounded-full" />
          <Skeleton className="h-4 w-80 rounded-full" />
        </div>
        
        {/* Contact row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-48 rounded-full" />
          </div>
        </div>
        
        {/* Footer with Save button and Medicare badge */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-32 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default function Demo() {
  return (
    <div className="p-8 space-y-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Loading State</h2>
      <HealthCardSkeleton />
      <HealthCardSkeleton />
      <HealthCardSkeleton />
    </div>
  );
}