"use client";

import { signOut } from "@/actions/signOut";
import useAuthTokenStore from "@/store/authTokenStore";

export const useSignOut = () => {
  const clearAuth = useAuthTokenStore((state) => state.clearAuth);
  const handleSignOut = async () => {
    await signOut();
    clearAuth();
  };
  return { handleSignOut };
};
