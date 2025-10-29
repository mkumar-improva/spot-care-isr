import { KEYS } from 'constants/KeyConstants';
import { jwtDecode, JwtPayload } from 'jwt-decode';


export const isValidToken = () => {
    try {
        const token = localStorage.getItem(KEYS.TOKEN) ?? ""
        const decoded = jwtDecode<JwtPayload>(token);

        if (!decoded.exp) {
            return false;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
};



export const isValidTokenFromURL = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (!decoded.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Error decoding URL token:", error);
    return false;
  }
};