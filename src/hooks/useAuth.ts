"use client";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore/index";
import { CustomError } from "@/types/error";

const useAuth = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const setToken = useAuthStore((state) => state.setToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (isAuth) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/refresh");

        if (!res.ok) {
          const data = await res.json();
          throw new CustomError(data.message, res.status);
        }
        const data = await res.json();

        setToken(data.payload);
      } catch (e) {
        if (process.env.NODE_ENV === "development") console.error(e);
        return null;
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [isAuth, setToken]);

  return { isAuth, loading };
};

export default useAuth;
