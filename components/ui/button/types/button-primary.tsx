import Button, { ButtonProps } from "@/components/ui/button/button";
import React, { FC ,ButtonHTMLAttributes} from "react";

interface ButtonPrimaryProps extends ButtonProps {
  className?: ButtonHTMLAttributes<HTMLButtonElement>["className"];
  loading?: boolean;
}

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  className = "bg-primary-700 font-medium text-white rounded-full px-6 py-2 text-base hover:bg-primary-800 transition-colors duration-200 ease-in-out",
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

export default ButtonPrimary;
