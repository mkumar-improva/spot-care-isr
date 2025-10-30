import { jwtDecode, JwtPayload } from "jwt-decode";
import { AUTH_KEYS } from "@/constants/KeyConstants";
import { UserData } from "@/types/user-data";

export interface AuthData {
  token: string;
  userId: string;
  email: string;
  username: string;
  profileImage: string;
}

export const isValidToken = (tokenval: string): boolean => {
  if (!tokenval) return false;
  try {
    const decoded = jwtDecode<JwtPayload>(tokenval);
    if (!decoded.exp) return false;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (err) {
    console.error("Error decoding token:", err);
    return false;
  }
};

export const AuthHelper = {
  saveSession: (userdata: UserData) => {
    localStorage.setItem(AUTH_KEYS.ISLOGGEDIN, "true");
    localStorage.setItem(AUTH_KEYS.EMAIL, userdata.email ?? "");
    localStorage.setItem(AUTH_KEYS.TOKEN, userdata.token ?? "");
    localStorage.setItem(AUTH_KEYS.PROFILEIMAGE, userdata.profilePicture ?? "");
    localStorage.setItem(AUTH_KEYS.USERNAME, userdata.firstName ?? "");
    localStorage.setItem(AUTH_KEYS.USERID, userdata.id?.toString() ?? "");
    localStorage.setItem(AUTH_KEYS.FIRSTNAME, userdata.firstName ?? "");
    localStorage.setItem(AUTH_KEYS.LASTNAME, userdata.lastName ?? "");
  },
  clearSession: () => {
    Object.values(AUTH_KEYS).forEach((key) => localStorage.removeItem(key));
  },
  getSession: () => ({
    isLoggedIn: localStorage.getItem(AUTH_KEYS.ISLOGGEDIN) === "true",
    email: localStorage.getItem(AUTH_KEYS.EMAIL),
    token: localStorage.getItem(AUTH_KEYS.TOKEN),
    profileImage: localStorage.getItem(AUTH_KEYS.PROFILEIMAGE),
    username: localStorage.getItem(AUTH_KEYS.USERNAME),
    userId: localStorage.getItem(AUTH_KEYS.USERID),
  }),
};
