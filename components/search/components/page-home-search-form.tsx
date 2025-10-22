"use client";
import { FC, HtmlHTMLAttributes } from "react";
import RenderSearchFormCategory from "./render-searchform-category";
import AnimatedForm from "./animated-form";
import useSearchUiStore from "store/ui/search-ui-store";

interface HeroSearchFormProps {
  className?: HtmlHTMLAttributes<HTMLDivElement>["className"];
  isHomePage?: boolean;
}

const PageHomeSearchForm: FC<HeroSearchFormProps> = ({ className, isHomePage }) => {
  //store import
  const { searchActiveTab } = useSearchUiStore();
  return (
    <div className={`w-full max-w-5xl mx-auto pb-6`}>
      <div
        className={`nc-HeroSearchForm w-full md:max-w-3xl lg:max-w-4xl xl:max-w-6xl ${className} flex flex-col  justify-start gap-[1.4rem]
        lg:py-0 pl-0 lg:pl-4 2xl:pl-20 items-start`}
      >
        <RenderSearchFormCategory isHomePage={isHomePage} />
        <AnimatedForm activeTab={searchActiveTab} />
      </div>
    </div>
  );
};

export default PageHomeSearchForm;
