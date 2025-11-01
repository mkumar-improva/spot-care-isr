import Lottie from "lottie-react";
import NoRecords from "@/assets/Lottie/NoRecords.json";
import React, { FC, HTMLAttributes } from "react";
import Heading from "../Heading/Heading";

interface NoProvidersContainerProps {
  NoRecordsContainerRef: React.RefObject<HTMLDivElement>;
  headingText?: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  lottieClassName?: HTMLAttributes<HTMLDivElement>["className"];
}

const NoProvidersContainerProps: FC<NoProvidersContainerProps> = ({
  NoRecordsContainerRef,
  headingText = "No Providers Found",
  className = "relative flex flex-col h-screen max-w-full items-center justify-center",
  lottieClassName = "size-96",
}) => {
  return (
    <div className={className}>
      <div className={lottieClassName} ref={NoRecordsContainerRef}>
        <Lottie animationData={NoRecords} loop={true} />
      </div>
      <Heading desc={"Please search for other cares"} className="text-center">
        No providers found
      </Heading>
    </div>
  );
};

export default NoProvidersContainerProps;
