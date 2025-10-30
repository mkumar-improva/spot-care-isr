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
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserName,
    setEmail,
    setProfileImage,
    setFirstName,
    setLastName,
  } = useAuthUIStore();

  //restricted routes
  const RESTRICTED_ROUTES = ["/account"]; // e.g., ['/dashboard', '/profile']

  useEffect(() => {
    const token = localStorage.getItem(AUTH_KEYS.TOKEN);
    const loggedIn = localStorage.getItem(AUTH_KEYS.ISLOGGEDIN) === "true";
    const valid = isValidToken(token ?? "");

    const isRestricted = RESTRICTED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    console.log("AuthWatcher Triggered:", {
      isLoggedIn,
      token,
      valid,
    });
    // --- Case 0: Rehydrate session on page load ---
    if (loggedIn && token && valid) {
      console.info("Hydrating session from localStorage…");

      setIsLoggedIn(true);
      const userName = localStorage.getItem(AUTH_KEYS.USERNAME) || "";
      const email = localStorage.getItem(AUTH_KEYS.EMAIL) || "";
      const profileImage = localStorage.getItem(AUTH_KEYS.PROFILEIMAGE) || "";
      const firstName = localStorage.getItem(AUTH_KEYS.FIRSTNAME) || "";
      const lastName = localStorage.getItem(AUTH_KEYS.LASTNAME) || "";
      setFirstName(firstName);
      setLastName(lastName);
      setUserName(userName);
      setEmail(email);
      setProfileImage(profileImage);
    }

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
      setIsLoggedIn(false);
      notFound();
    }
  }, [pathname]);
};
