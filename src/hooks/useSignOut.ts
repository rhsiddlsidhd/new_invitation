"use client";

import { logoutUser } from "@/actions/logoutUser";
import useAuthStore from "@/store/auth.store";

export const useSignOut = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const handleSignOut = async () => {
    await logoutUser();
    clearAuth();
  };
  return { handleSignOut };
};
