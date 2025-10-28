"use client";
import { useAuthWatcher } from "@/hooks/auth/use-auth-watcher";

const AuthWatcherClient = () => {
  useAuthWatcher();

  return null;
};

export default AuthWatcherClient;
