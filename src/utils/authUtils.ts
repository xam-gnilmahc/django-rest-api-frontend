// src/utils/authUtils.ts
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "accessToken";

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export interface JwtPayload {
  sub?: string;
  email?: string;
  username?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export function getUserFromToken(): JwtPayload | null {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}
