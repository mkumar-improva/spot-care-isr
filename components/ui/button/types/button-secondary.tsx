import Button, { ButtonProps } from "@/components/ui/button/button";
import React, { FC ,ButtonHTMLAttributes} from "react";

interface ButtonSecondaryProps extends ButtonProps {
  className?: ButtonHTMLAttributes<HTMLButtonElement>["className"];
  loading?: boolean;
}

const ButtonSecondary: FC<ButtonSecondaryProps> = ({
  className = "border border-neutral-200 font-medium text-black rounded-full px-6 py-2 text-base hover:bg-neutral-100 transition-colors duration-200 ease-in-out",
  loading = false,
  children,
  ...args
}) => {
  return (
    <Button
      className={`${className}`}
      loading={loading}
      {...args}
    >
      {children}
    </Button>
  );
};

export default ButtonSecondary;