"use client";
import { signOut } from "@/actions/auth/signOut";
import Spinner from "@/components/atoms/Spinner";
import useAuth from "@/hooks/useAuth";
import useAuthStore from "@/store/authStore/index";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const navigate = useRouter();
  const { isAuth, loading } = useAuth();
  const setToken = useAuthStore((state) => state.setToken);
  const handlesignOut = async () => {
    await signOut();
    setToken(null);
  };

  const handleSignin = async () => {
    try {
      const path = "/login";

      const res = await fetch(
        `/api/auth/entry?next=${encodeURIComponent(path)}`,
        {
          method: "POST",
        },
      );

      const data = await res.json();

      navigate.replace(data.payload);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <Spinner />;

  return (
    <Link onClick={() => (isAuth ? handlesignOut() : handleSignin())} href="#">
      {isAuth ? "로그아웃" : "로그인"}
    </Link>
  );
};

export default AuthButton;
