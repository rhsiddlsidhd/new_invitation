"use client";
import { useEffect } from "react";
import { ApiResponse, UserData } from "../_types";
import useAuthStore from "../_store/authStore";

const useAuth = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUserId,
    setUserEmail,
    userId,
  } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      console.log("useAuth hook called", userId);
      // if (userId) {
      //   setIsAuthenticated(true);
      //   return;
      // }

      const token = sessionStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setUserId("");
        setUserEmail("");
        return;
      }

      try {
        const res = await fetch("/api/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data: ApiResponse<UserData> = await res.json();
        if (!data.success) {
          setIsAuthenticated(false);
          sessionStorage.removeItem("token");
          return;
        } else {
          setIsAuthenticated(true);
          const { userId, email, newAccessToken } = data.data;
          setUserId(userId);
          setUserEmail(email);
          if (newAccessToken) {
            sessionStorage.setItem("token", newAccessToken);
          }
        }
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
        sessionStorage.removeItem("token");
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setUserId, setUserEmail, userId]);

  return { isAuthenticated };
};

export default useAuth;
