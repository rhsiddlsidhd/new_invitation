"use client";
import { useEffect, useState } from "react";
import useAuthStore from "../store/auth.store";
import { refreshAccessToken } from "@/api/fetcher";
import { handleClientError } from "@/api/error";

const useAuth = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const userId = useAuthStore((state) => state.userId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const currentToken = useAuthStore.getState().token;

      if (currentToken) {
        setLoading(false);
        return;
      }

      try {
        await refreshAccessToken();
      } catch (e) {
        handleClientError(e);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  return { isAuth, loading, userId };
};

export default useAuth;
