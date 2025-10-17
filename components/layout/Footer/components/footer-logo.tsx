import Logo from "@/components/ui/logo";
import logoImg from "@/assets/app/spot/full.png";

const FooterLogo = () => {
  const onScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-start items-start lg:items-center">
      <Logo
        img={logoImg}
        alt="SpotCare Logo"
        href="/"
        className="w-[7.25rem] relative z-[999999]"
        onclick={onScroll}
      />
    </div>
  );
};

export default FooterLogo;
