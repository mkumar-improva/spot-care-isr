import SuccessMessagePng from "@/assets/success.png";
import Image from "next/image";

const SuccessMessage = () => {
  return (
    <div className="flex flex-col text-neutral-700 dark:text-neutral-300 justify-center items-center gap-y-6 px-6 py-6">
      <Image height={100} width={100} src={SuccessMessagePng} alt="Success" />
      <p className="text-base font-normal text-center text-[14px] text-gray-500 max-w-sm break-words">
        Thank you! Your request has been received. A care advisor will contact
        you soon.
      </p>
    </div>
  );
};

export default SuccessMessage;
