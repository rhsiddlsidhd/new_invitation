"use client";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore/index";

const useAuth = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const setToken = useAuthStore((state) => state.setToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      console.log("isAuth", isAuth);
      if (isAuth) {
        setLoading(false);
        return;
      }

      try {
        console.log("?");
        const res = await fetch("/api/auth/refresh");
        if (!res.ok) return;
        const data = await res.json();

        setToken(data.payload);
      } catch (e) {
        console.log("refresh error", e);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [isAuth, setToken]);

  return { isAuth, loading };
};

export default useAuth;
