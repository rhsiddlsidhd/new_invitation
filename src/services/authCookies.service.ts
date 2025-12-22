import { getCookie, deleteCookie } from "@/shared/lib/cookies";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const TOKEN_KEY = "token";

export const getAuthToken = async (): Promise<RequestCookie | undefined> => {
  return await getCookie(TOKEN_KEY);
};

export const deleteAuthToken = async (): Promise<void> => {
  return await deleteCookie(TOKEN_KEY);
};
