"use client";

import { logoutUser } from "@/actions/logoutUser";
import useAuthTokenStore from "@/store/authTokenStore";

export const useSignOut = () => {
  const clearAuth = useAuthTokenStore((state) => state.clearAuth);
  const handleSignOut = async () => {
    await logoutUser();
    clearAuth();
  };
  return { handleSignOut };
};
