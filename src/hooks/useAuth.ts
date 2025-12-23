"use client";
import { useEffect, useState } from "react";
import useAuthTokenStore from "../store/authTokenStore";
import { fetcher } from "@/api/fetcher";
import { handleClientError } from "@/api/error";
import { UserRole } from "@/models/user.model";

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
        const data = await fetcher<{ accessToken: string; role: UserRole }>(
          "/api/auth/refresh",
        );

        const { accessToken, role } = data;
        setToken({ token: accessToken, role });
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
