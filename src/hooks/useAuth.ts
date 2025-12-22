"use client";
import { useEffect, useState } from "react";
import useAuthTokenStore from "../store/authTokenStore";
import { HTTPError } from "@/api/type";
import { fetcher } from "@/api/fetcher";
import { handleClientError } from "@/api/error";

const useAuth = () => {
  const isAuth = useAuthTokenStore((state) => state.isAuth);
  const setToken = useAuthTokenStore((state) => state.setToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (isAuth) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetcher<{ accessToken: string }>(
          "/api/auth/refresh",
        );

        setToken(data.accessToken);
      } catch (e) {
        handleClientError(e);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [isAuth, setToken]);

  return { isAuth, loading };
};

export default useAuth;
