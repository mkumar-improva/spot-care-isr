import React, { Fragment, useRef } from "react";
import { Tab } from "@headlessui/react";
import ProfileTab from "./profile-tab";
import ChangePasswordTab from "./change-password-tab";
import useAccountUIStore from "@/store/account/account-ui-store";

interface RenderSectionProps {
  onLogout: () => void;
}

const RenderSection = ({ onLogout }: RenderSectionProps) => {
  const categories = ["Profile", "Change password"];
  const { selectedTab, setSelectedTab } = useAccountUIStore();
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  return (
    <div className="w-full flex flex-col items-start justify-start border border-transparent lg:border-neutral-200 rounded-2xl p-0 md:p-4 lg:p-8 gap-8">
      <p className="text-[32px] font-semibold leading-[2rem]">
        Your account information
      </p>
      
      {/* Tab Group */}
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex gap-1 overflow-x-auto border-b border-gray-200 w-full">
          {categories.map((item) => (
            <Tab key={item} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`mr-6 pb-2 text-base transition-all duration-300 ease-in-out  outline-none${
                    selected
                      ? " text-black-600 border-b-4 border-purple-700 dark:text-white dark:border-white"
                      : " text-gray-600 border-b-4 border-transparent hover:text-gray-800 dark:text-gray-400"
                  } `}
                >
                  {item}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        
        <div
          style={{
            width: "100%",
            height: "auto",
            transition: "height 0.5s ease",
            overflow: "hidden",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          <Tab.Panel
            className=""
            ref={(el) => (panelRefs.current[0] = el as HTMLDivElement)}
          >
            <ProfileTab onLogout={onLogout} />
          </Tab.Panel>
          
          <Tab.Panel
            className=""
            ref={(el) => (panelRefs.current[1] = el as HTMLDivElement)}
          >
            <ChangePasswordTab onLogout={onLogout} />
          </Tab.Panel>
        </div>
      </Tab.Group>
    </div>
  );
};

export default RenderSection;
