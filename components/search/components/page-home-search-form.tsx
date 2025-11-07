"use client";
import { FC, HtmlHTMLAttributes, useRef } from "react";
import RenderSearchFormCategory from "./render-searchform-category";
import AnimatedForm from "./animated-form";
import useSearchUiStore from "store/ui/search-ui-store";

interface HeroSearchFormProps {
  className?: HtmlHTMLAttributes<HTMLDivElement>["className"];
  isHomePage?: boolean;
}

const PageHomeSearchForm: FC<HeroSearchFormProps> = ({
  className,
  isHomePage,
}) => {
  //store import
  const { searchActiveTab } = useSearchUiStore();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearchFieldFocus = () => {
    if (typeof window === "undefined") return;
    const element = containerRef.current;
    if (!element) return;
    const rectTop = element.getBoundingClientRect().top + window.scrollY;
    const offset = 150; // keep consistent with home scroll button
    window.scrollTo({ top: rectTop - offset, behavior: "smooth" });
  };

  return (
    <div className={`${!isHomePage ? "w-full max-w-5xl mx-auto pb-6" : ""}`}>
      <div
        ref={containerRef}
        className={`nc-HeroSearchForm w-full md:max-w-3xl lg:max-w-4xl xl:max-w-6xl py-5  md:pt-[3.3rem] 
        lg:pt-[0rem]${className} flex flex-col  justify-start gap-[1.4rem] ${
          isHomePage
            ? "lg:py-0 pl-0 lg:pl-4 2xl:pl-20 items-start"
            : "items-center"
        }`}
      >
        <RenderSearchFormCategory isHomePage={isHomePage} />
        <AnimatedForm activeTab={searchActiveTab} onFocusScroll={handleSearchFieldFocus} />
      </div>
    </div>
  );
};

export default PageHomeSearchForm;
