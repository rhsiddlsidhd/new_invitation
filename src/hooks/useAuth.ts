"use client";
import { useEffect, useMemo, useState } from "react";
import useAuthTokenStore from "../store/authTokenStore";
import { refreshAccessToken } from "@/api/fetcher";
import { handleClientError } from "@/api/error";
import { decodeJwt } from "jose";

const useAuth = () => {
  const isAuth = useAuthTokenStore((state) => state.isAuth);
  const token = useAuthTokenStore((state) => state.token);

  const [loading, setLoading] = useState(true);

  const userId = useMemo(
    () => (token ? (decodeJwt(token).id as string) : null),
    [token],
  );

  useEffect(() => {
    const verify = async () => {
      const currentToken = useAuthTokenStore.getState().token;

      if (currentToken) {
        setLoading(false);
        return;
      }

      try {
        console.log("호출");
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
