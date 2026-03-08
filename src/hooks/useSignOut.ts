"use client";

import { logoutUser } from "@/actions/logoutUser";

/**
 * 로그아웃 처리를 수행하고 홈으로 리다이렉트하는 훅
 */
export const useSignOut = () => {
  const handleSignOut = async () => {
    await logoutUser();
  };

  return { handleSignOut };
};
