"use client";
import { useRouter } from "next/navigation";
import { useEffect, FC } from "react";
import useResetPasswordUIStore from "@/store/ui/reset-password-ui-store";

interface ResetPasswordWatcherProps {
  token: string;
}

const UseResetPasswordWatcher: FC<ResetPasswordWatcherProps> = ({ token }) => {
  //navigation hooks
  const router = useRouter();

  //store
  const { setShowResetPassword, setResetPasswordToken } =
    useResetPasswordUIStore();

  //useEffect to watch for reset password token in URL
  useEffect(() => {
    if (token && token !== "") {
      router.replace("/");
      setResetPasswordToken(token);
      setShowResetPassword(true);
    }
  }, [token, router, setResetPasswordToken, setShowResetPassword]);

  return null;
};

export default UseResetPasswordWatcher;
