"use client";
import ButtonPrimary from "@/components/ui/button/types/button-primary";
import ButtonSecondary from "@/components/ui/button/types/button-secondary";
import MenuBar from "./menu-bar";
import useAuthUIStore from "@/store/ui/auth-ui-store";

const NavBarElements = () => {
  const { setShowLogin, setShowSignup, setShowForgotPassword } =
    useAuthUIStore();
  return (
    <>
      <div className="hidden md:flex relative z-10 items-center justify-end gap-2">
        <ButtonSecondary
          onclick={() => {
            setShowForgotPassword(false);
            setShowLogin(true);
            setShowSignup(false);
          }}
        >
          Login
        </ButtonSecondary>
        <ButtonPrimary
          onclick={() => {
            setShowSignup(true);
            setShowLogin(false);
            setShowForgotPassword(false);
          }}
        >
          Sign Up Free
        </ButtonPrimary>
      </div>
      <div className="block md:hidden z-10">
        <MenuBar />
      </div>
    </>
  );
};

export default NavBarElements;
