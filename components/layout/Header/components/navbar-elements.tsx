import ButtonPrimary from "@/components/ui/button/types/button-primary";
import ButtonSecondary from "@/components/ui/button/types/button-secondary";
import MenuBar from "./menu-bar";

const NavBarElements = () => {
  return (
    <>
      <div className="hidden md:flex relative z-10 items-center justify-end gap-2">
        <ButtonSecondary>Login</ButtonSecondary>
        <ButtonPrimary>Sign Up Free</ButtonPrimary>
      </div>
      <div className="block md:hidden z-10">
        <MenuBar />
      </div>
    </>
  );
};

export default NavBarElements;
