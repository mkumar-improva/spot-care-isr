import Lottie from "lottie-react";
import SuccessLottieAnimation from "@/assets/Lottie/SuccessLottie.json";

const SuccessMessage = () => {
    return (
      <div className="flex flex-col text-neutral-700 dark:text-neutral-300 justify-center items-center gap-y-6 px-6 py-6">
        <div className="w-[100px] h-[100px]">
          <Lottie
            animationData={SuccessLottieAnimation}
            loop={false}
            autoplay={true}
          />
        </div>
        <p className="text-base font-normal text-center text-[14px] text-gray-500 max-w-sm break-words">
          Thank you! Your request has been received. A care advisor will contact
          you soon.
        </p>
      </div>
    );
  };

  export default SuccessMessage;