"use client";
import React, { FC, useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import useLoadingState from "@/store/loader/loding-state";
import useProviderListDataStore from "@/store/data/use-provider-list-data-store";
import useHeaderUiStore from "@/store/ui/header-ui-store";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import { AUTH_KEYS } from "@/constants/KeyConstants";

interface usePaginationProps {
  className?: string;
  pageCount?: number;
  onPageChange?: Function;
}

const usePagination = ({
  className = "",
  pageCount = 0,
  onPageChange = () => {},
}: usePaginationProps) => {
  //params
  const searchParams = useSearchParams();
  const pathname = usePathname();

  //store
  const { loading } = useLoadingState();
  const { providerList, setFilteredPaginatedList } = useProviderListDataStore();
  const { isHomePage } = useHeaderUiStore();
  const { setShowLogin } = useAuthUIStore();

  //state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = pageCount ?? 10;

  //useeffect to update paginated list

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const totalPageCount = Math.ceil(
      (providerList?.length ?? 0) / itemsPerPage
    );
    setTotalPages(totalPageCount);

    if (!isHomePage) {
      let currentPage = parseInt(pageParam ?? "1");

      // If current page exceeds total pages after filtering, reset it
      if (currentPage > totalPageCount) {
        currentPage = totalPageCount || 1;
      }

      setCurrentPage(currentPage);
    } else {
      setCurrentPage(1);
    }
  }, [providerList]);

  useEffect(() => {
    const currentData = providerList.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    setFilteredPaginatedList(currentData);
  }, [currentPage, providerList, itemsPerPage]);

  //handlers
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem(AUTH_KEYS.ISLOGGEDIN) === "true"; // Change to actual check if needed
    if (isLoggedIn) {
      setCurrentPage(page);
      onPageChange?.();
      if (!isHomePage) {
        newParams.set("page", page.toString());
        const newUrl = `${pathname}?${newParams.toString()}`;
        window.history.replaceState({}, "", newUrl);
      }
    } else {
      setShowLogin(true);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const paginationItems = (): number[] => {
    const pages: number[] = [];
    const visiblePages = 3;

    let rangeStart = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    let rangeEnd = rangeStart + visiblePages - 1;

    if (rangeEnd > totalPages) {
      rangeEnd = totalPages;
      rangeStart = Math.max(rangeEnd - visiblePages + 1, 1);
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    return pages;
  };

  return {
    currentPage,
    providerList,
    totalPages,
    handlePageChange,
    goToNextPage,
    goToPreviousPage,
    paginationItems,
  };
};

export default usePagination;
