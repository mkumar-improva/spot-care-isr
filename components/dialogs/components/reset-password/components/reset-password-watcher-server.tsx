"use client";
import UseResetPasswordWatcher from "@/hooks/reset-password/use-reset-password-watcher";

const ResetPasswordWatcherServer = ({ token }: { token: string }) => {
  return <UseResetPasswordWatcher token={token} />;
};

export default ResetPasswordWatcherServer;
