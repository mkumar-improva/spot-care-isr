"use client";
import useHeaderUiStore from "store/ui/header-ui-store";
import useSearchUiStore from "store/ui/search-ui-store";

const RenderSearchFormCategory = () => {
  /*----------Begining of Store Import----------*/
  const { isHomePage } = useHeaderUiStore();
  const { searchActiveTab, setSearchActiveTab } = useSearchUiStore();
  /*----------End of Store Import----------*/

  return (
    <div
      className={`w-full flex items-center ${
        isHomePage ? "justify-start" : "justify-center"
      } gap-[1rem] pl-[1.5rem]`}
    >
      <div
        className="flex items-center cursor-pointer gap-[.5rem]"
        onClick={() => setSearchActiveTab("services")}
      >
        <div
          className={`hidden md:block w-[10px] h-[10px] rounded-full ${
            searchActiveTab === "services"
              ? "bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-300"
              : "bg-transparent"
          }`}
        ></div>
        <p
          className={`text-base font-semibold ${
            searchActiveTab === "services"
              ? "text-neutral-900 underline md:no-underline decoration-[2.5px] underline-offset-4"
              : "text-neutral-500 underline-offset-[2px]"
          }`}
        >
          Services
        </p>
      </div>
      <div
        className="flex items-center cursor-pointer gap-[.5rem]"
        onClick={() => setSearchActiveTab("provider")}
      >
        <div
          className={`hidden md:block w-[10px] h-[10px] rounded-full ${
            searchActiveTab === "provider"
              ? " bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-300"
              : "bg-transparent"
          }`}
        ></div>
        <p
          className={`text-base font-semibold ${
            searchActiveTab === "provider"
              ? "text-neutral-900 underline md:no-underline decoration-[2.5px] underline-offset-4"
              : "text-neutral-500 underline-offset-[2px]"
          }`}
        >
          Providers
        </p>
      </div>
    </div>
  );
};

export default RenderSearchFormCategory;
