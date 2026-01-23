"use client";
import { useEffect, useMemo, useState } from "react";
import useAuthStore from "../store/auth.store";
import { refreshAccessToken } from "@/api/fetcher";
import { handleClientError } from "@/api/error";
import { decodeJwt } from "jose";

const useAuth = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const token = useAuthStore((state) => state.token);

  const [loading, setLoading] = useState(true);

  const userId = useMemo(() => {
    if (!token) return null;
    try {
      const payload = decodeJwt(token);
      return payload.id;
    } catch {
      return null;
    }
  }, [token]);

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
