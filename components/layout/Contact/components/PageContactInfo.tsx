import { Config } from "constants/config";
import {
  Facebook02Icon,
  Linkedin02Icon,
  NewTwitterIcon,
} from "@hugeicons-pro/core-stroke-standard/index";
import {
  Mail01Icon,
  InstagramIcon,
} from "@hugeicons-pro/core-stroke-rounded/index";
import { HugeiconsIcon } from "@hugeicons/react";
const info = [
  {
    title: "Email",
    icon: Mail01Icon,
    content: Config.KEY.EMAIL,
  },
];

const socialPlatforms = [
  {
    title: "Linkedin",
    icon: Linkedin02Icon,
  },
  {
    title: "facebook",
    icon: Facebook02Icon,
  },
  {
    title: "Instagram",
    icon: InstagramIcon,
  },

  {
    title: "twitter",
    icon: NewTwitterIcon,
  },
];

const PageContactInfo = () => {
  return (
    <div className="lg:w-1/2 w-full flex md:flex-col flex-col justify-start items-start gap-[2rem] lg:gap-[3rem] pt-2 md:pt-10">
      <div className="w-full flex flex-col justify-start items-start gap-[1rem] lg:gap-[2rem]">
        <p className="text-[#6334e3] font-semibold tracking-[3px] text-2xl">
          CONTACT US
        </p>
        <p className="text-4xl text-neutral-900 dark:text-neutral-200 text-[2.5rem] md:text-[3.5rem] font-extrabold leading-[4rem] -ml-[5px]">
          Get in touch
        </p>
        <p className="text-neutral-500 dark:text-neutral-300 text-base">
          We love questions and feedback - and we're always happy to help!
        </p>
      </div>
      <div className="w-full 2xl:w-[80%] flex flex-col justify-start items-start gap-[2rem]">
        {info.map((e) => (
          <div
            className=" flex items-center justify-center md:justify-start w-full space-x-8  bg-[#fafafa] 
            dark:bg-neutral-800 px-2 sm:pl-4 sm:pr-10 
            py-3 rounded-xl border-[#ebebeb] dark:border-neutral-700 border-[1px]"
          >
            <div className="p-3 bg-[#ebe6f8] dark:bg-neutral-700 rounded-xl">
              <HugeiconsIcon
                icon={e.icon}
                size={32}
                className="text-[#6334e3] font-bold"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-start">
              <p className="text-neutral-500 dark:text-neutral-300 text-sm">
                {e.title}
              </p>
              <p className="text-base lg:text-2xl font-extrabold tracking-[1px]">
                {e.content}
              </p>
            </div>
          </div>
        ))}
        <div className="w-full flex items-start justify-center md:justify-start 
        space-x-4 md:space-x-[3rem] lg:space-x-[5.15rem] xl:space-x-[3.25rem] 2xl:space-x-14">
          {socialPlatforms.map((e) => (
            <div
              className={`p-3 bg-[#f7f6f6] dark:bg-neutral-800 rounded-xl cursor-pointer`}
              title={e.title}
            >
              <HugeiconsIcon icon={e.icon} className="size-[1.9rem]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageContactInfo;
