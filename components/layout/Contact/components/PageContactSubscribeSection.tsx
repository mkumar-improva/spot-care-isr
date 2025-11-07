import ButtonCircle from "@/components/ui/button/types/button-circle";
import Input from "@/components/ui/Input/Input";
import NcImage from "@/components/ui/NcImage/NcImage";
import subscribePng from "images/SVG-subcribe2.png";

const PageContactSubscribeSection = () => {
  return (
    <div className="md:w-8/12 w-full flex md:flex-row flex-col items-center justify-between mb-16 gap-8 px-4">
      <div className="md:w-1/2 w-full flex flex-col items-start justify-start gap-4">
        <h2 className="font-semibold text-4xl">Join our newsletter 🎉</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Read and share new perspectives on just about any topic. Everyone’s
          welcome.
        </span>
        <div className="w-full flex items-center justify-start relative">
          <Input
            placeholder=""
            type="email"
            rounded="rounded-full"
          />
          <ButtonCircle
            className="absolute transform top-1/2 -translate-y-1/2 right-[5px]"
            size="h-9 w-9"
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonCircle>
        </div>
      </div>
      <div className="md:w-1/2 w-full">
        <NcImage src={subscribePng.src} />
      </div>
    </div>
  );
};

export default PageContactSubscribeSection;
