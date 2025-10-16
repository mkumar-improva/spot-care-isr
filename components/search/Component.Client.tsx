"use client";
import { FC, HtmlHTMLAttributes } from "react";
import useHeaderUiStore from "store/ui/header-ui-store";
import useSearchUiStore from "store/ui/search-ui-store";
import RenderSearchFormCategory from "./components/render-searchform-category";
import AnimatedForm from "./components/animated-form";

interface HeroSearchFormProps {
  className?: HtmlHTMLAttributes<HTMLDivElement>["className"];
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({ className }) => {
  /*----------Begining of Store Import----------*/
  const { isHomePage, showHeroSearch } = useHeaderUiStore();
  const { searchActiveTab } = useSearchUiStore();
  /*----------End of Store Import----------*/

  return (
    <div
      className={`absolute inset-x-0 left-5 md:left-0  transition-all will-change-[transform,opacity] ${
        showHeroSearch
          ? "visible"
          : "-translate-x-0 -translate-y-[100px] scale-x-[0.395]  opacity-0 invisible pointer-events-none"
      }`}
    >
      <div className={`w-full max-w-5xl mx-auto pb-6`}>
        <div
          className={`nc-HeroSearchForm w-full md:max-w-3xl lg:max-w-4xl xl:max-w-6xl ${className} flex flex-col  justify-start gap-[1.4rem] ${
            isHomePage
              ? "lg:py-0 pl-0 lg:pl-4 2xl:pl-20 items-start"
              : "items-center"
          }`}
        >
          <RenderSearchFormCategory />
          <AnimatedForm activeTab={searchActiveTab} />
        </div>
      </div>
    </div>
  );
};

export default HeroSearchForm;
