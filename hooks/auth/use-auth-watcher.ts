"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthHelper, isValidToken } from "@/utils/auth-helper";
import { AUTH_KEYS } from "@/constants/KeyConstants";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import { notFound } from "next/navigation";

export const useAuthWatcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  //store
  const { isLoggedIn, setIsLoggedIn } = useAuthUIStore();

  //restricted routes
  const RESTRICTED_ROUTES = ["/account"]; // e.g., ['/dashboard', '/profile']

  useEffect(() => {
    const token = localStorage.getItem(AUTH_KEYS.TOKEN);
    const loggedIn = localStorage.getItem(AUTH_KEYS.ISLOGGEDIN) === "true";
    const valid = isValidToken(token ?? "");

    const isRestricted = RESTRICTED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    // --- Case 1: Session expired ---
    if (loggedIn && !valid) {
      console.warn("Session expired. Logging out...");
      AuthHelper.clearSession();
      setIsLoggedIn(false);
      if (isRestricted) {
        router.push("/");
      }
      return;
    }

    // --- Case 2: LoggedIn flag true but no token ---
    if (!token && loggedIn) {
      AuthHelper.clearSession();
      setIsLoggedIn(false);
      if (isRestricted) {
        router.push("/");
      }
      return;
    }

    // --- Case 3: Unauthorized access to restricted routes ---
    if (isRestricted && (!loggedIn || !valid)) {
      console.warn("Unauthorized access attempt:", pathname);
      router.push("/");
      setIsLoggedIn(false);
      return;
    }

    // --- Case 4: Valid token present -> ensure in-memory and local flags are set ---
    if (token && valid) {
      if (!loggedIn) {
        localStorage.setItem(AUTH_KEYS.ISLOGGEDIN, "true");
      }
      setIsLoggedIn(true);
      return;
    }
  }, [pathname]);
};
