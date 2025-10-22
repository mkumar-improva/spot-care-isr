"use client";
import { useMemo, useState, useEffect } from "react";
import { faqData } from "@/components/layout/Faq/data";

const useFaqCategory = () => {
  const defaultCategory = useMemo(
    () => Object.keys(faqData)[0] || "",
    []
  );
  
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentFAQ = faqData[activeCategory] || Object.values(faqData)[0];
  const allCategories = Object.values(faqData);
  const allFaqData = faqData;

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleNextCategory = () => {
    const currentIndex = allCategories.findIndex(
      (cat) => cat.id === activeCategory
    );
    if (currentIndex < allCategories.length - 1) {
      setActiveCategory(allCategories[currentIndex + 1].id);
    }
  };

  const handlePreviousCategory = () => {
    const currentIndex = allCategories.findIndex(
      (cat) => cat.id === activeCategory
    );
    if (currentIndex > 0) {
      setActiveCategory(allCategories[currentIndex - 1].id);
    }
  };

  const handleResetCategory = () => {
    setActiveCategory(defaultCategory);
  };

  return {
    activeCategory,
    isMobile,
    currentFAQ,
    allCategories,
    allFaqData,
    defaultCategory,
    handleCategoryChange,
    handleNextCategory,
    handlePreviousCategory,
    handleResetCategory,
  };
};

export default useFaqCategory;
