"use client";
import { useEffect, useState } from "react";
import useAuthTokenStore from "../store/authTokenStore";
import { refreshAccessToken } from "@/api/fetcher";
import { handleClientError } from "@/api/error";
import { decodeJwt } from "jose";

const useAuth = () => {
  const isAuth = useAuthTokenStore((state) => state.isAuth);
  const token = useAuthTokenStore((state) => state.token);
  const setToken = useAuthTokenStore((state) => state.setToken);
  const [loading, setLoading] = useState(true);

  const userId = token ? (decodeJwt(token).id as string) : null;
  useEffect(() => {
    const verify = async () => {
      if (isAuth) {
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
  }, [isAuth, setToken]);

  return { isAuth, loading, userId };
};

export default useAuth;
