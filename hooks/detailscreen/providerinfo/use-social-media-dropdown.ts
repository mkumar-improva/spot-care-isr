"use client";

import { useState, useEffect, useRef } from "react";

export const useSocialMediaDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [headerCount, setHeaderCount] = useState(3);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update header count based on screen size
  useEffect(() => {
    const updateHeaderCount = () => {
      if (window.innerWidth < 640) {
        setHeaderCount(1);
      } else if (window.innerWidth < 768) {
        setHeaderCount(2);
      } else {
        setHeaderCount(3);
      }
    };

    updateHeaderCount();
    window.addEventListener("resize", updateHeaderCount);

    return () => {
      window.removeEventListener("resize", updateHeaderCount);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return {
    isDropdownOpen,
    headerCount,
    dropdownRef,
    toggleDropdown,
  };
};
