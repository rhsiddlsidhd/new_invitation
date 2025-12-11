"use client";
import { signOut } from "@/actions/auth/signOut";
import Spinner from "@/components/atoms/Spinner";
import useAuth from "@/hooks/useAuth";
import useAuthStore from "@/store/authStore/index";
import Link from "next/link";
import React from "react";

const AuthButton = () => {
  const { isAuth, loading } = useAuth();
  const setToken = useAuthStore((state) => state.setToken);
  const handlesignOut = async () => {
    await signOut();
    setToken(null);
  };

  if (loading) return <Spinner />;

  return (
    <Link
      onClick={() => isAuth && handlesignOut()}
      href={isAuth ? `#` : `/login`}
    >
      {isAuth ? "로그아웃" : "로그인"}
    </Link>
  );
};

export default AuthButton;
