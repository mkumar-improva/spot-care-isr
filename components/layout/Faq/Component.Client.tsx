"use client";

import { useMemo, useState, useEffect } from "react";
import Topicbar from "./components/TopicBar";
import FAQContent from "./components/FaqContent";
import { faqData } from "./data";
import { Helmet } from "react-helmet-async";
import { Config } from "constants/config";

function FAQ() {
  const defaultCategory = useMemo(() => Object.keys(faqData)[0] || "", []);
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

  if (!currentFAQ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600">No FAQ content available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="w-full max-w-screen-2xl mx-auto px-2 md:px-[2rem] xl:px-[7.5rem] pt-2 lg:py-[2rem]">
        <div className={isMobile ? "" : "flex flex-row h-auto overflow-hidden"}>
          {!isMobile && (
            <Topicbar
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          )}
          <FAQContent
            category={currentFAQ.id}
            title={currentFAQ.title}
            description={currentFAQ.description}
            questions={currentFAQ.questions}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
}

export default FAQ;
