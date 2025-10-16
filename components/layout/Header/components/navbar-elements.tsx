import ButtonPrimary from "@/components/ui/button/types/button-primary";
import ButtonSecondary from "@/components/ui/button/types/button-secondary";

const NavBarElements = () => {
  return (
    <div className="flex relative z-10 items-center justify-end gap-2">
      <ButtonSecondary>Login</ButtonSecondary>
      <ButtonPrimary>Sign Up Free</ButtonPrimary>
    </div>
  );
};

export default NavBarElements;
