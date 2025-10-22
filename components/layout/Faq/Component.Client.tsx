"use client";
import Topicbar from "./components/TopicBar";
import FAQContent from "./components/FaqContent";
import useFaqCategory from "@/hooks/faq/use-faq-category";

function FAQ() {
  const {
    activeCategory,
    isMobile,
    currentFAQ,
    handleCategoryChange,
  } = useFaqCategory();

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
              onCategoryChange={handleCategoryChange}
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
