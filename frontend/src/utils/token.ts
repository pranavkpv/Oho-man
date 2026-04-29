import { TokenPayload } from "@/types/data";
import { jwtDecode } from "jwt-decode";


const ACCESS_KEY = "accessToken";

export const setAccessToken = (
  token: string
) => {
  localStorage.setItem(
    ACCESS_KEY,
    token
  );
};

export const getAccessToken = () => {
  return localStorage.getItem(
    ACCESS_KEY
  );
};

export const removeAccessToken = () => {
  localStorage.removeItem(
    ACCESS_KEY
  );
};


export const decodeToken = (token: string | null): TokenPayload | null => {
  try {
    if (!token) return null;
    return jwtDecode<TokenPayload>(token);
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
