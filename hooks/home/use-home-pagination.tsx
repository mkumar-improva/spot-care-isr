"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import useHomeDataStore from "@/store/data/home-data-store";
import useHomeUiStore from "@/store/ui/home-ui-store";

interface HomePaginationProps {
  pageCount?: number;
  onPageChange?: () => void;
}

const useHomePagination = ({ pageCount = 10, onPageChange }: HomePaginationProps) => {
  // Zustand stores
  const { homeProviderList, setHomeFilteredPaginatedList } = useHomeDataStore();
  const { currentPage, setCurrentPage } = useHomeUiStore();

  // Derived state
  const totalPages = useMemo(
    () => Math.ceil((homeProviderList?.length || 0) / pageCount),
    [homeProviderList, pageCount]
  );

  // Update filtered data when list or page changes
  useEffect(() => {
    const start = (currentPage - 1) * pageCount;
    const end = start + pageCount;
    const paginated = homeProviderList.slice(start, end);
    setHomeFilteredPaginatedList(paginated);
  }, [currentPage, homeProviderList, pageCount, setHomeFilteredPaginatedList]);

  // Reset pagination when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [homeProviderList, setCurrentPage]);

  // Handlers (memoized for referential stability)
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return;
      setCurrentPage(newPage);
      onPageChange?.();
    },
    [setCurrentPage, onPageChange, totalPages]
  );

  const goToNextPage = useCallback(() => handlePageChange(currentPage + 1), [handlePageChange, currentPage]);
  const goToPreviousPage = useCallback(() => handlePageChange(currentPage - 1), [handlePageChange, currentPage]);

  // Pagination range generator
  const paginationItems = useMemo(() => {
    if (totalPages <= 1) return [1];

    const visiblePages = 3;
    const half = Math.floor(visiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + visiblePages - 1, totalPages);

    if (end - start < visiblePages - 1) start = Math.max(end - visiblePages + 1, 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    paginationItems,
    homeProviderList,
    goToNextPage,
    goToPreviousPage,
    handlePageChange,
  };
};

export default useHomePagination;
