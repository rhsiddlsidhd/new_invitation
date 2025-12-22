"use client";

import Spinner from "@/components/atoms/Spinner/Spinner";
import useAuth from "@/hooks/useAuth";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { signOut } from "@/actions/signOut";
import useAuthTokenStore from "@/store/authTokenStore";
import { fetcher } from "@/api/fetcher";
import { handleClientError } from "@/api/error";

const AuthButton = () => {
  const router = useRouter();
  const { isAuth, loading } = useAuth();
  const setToken = useAuthTokenStore((state) => state.setToken);

  const handlesignOut = async () => {
    await signOut();
    setToken(null);
  };

  const handleSignin = async () => {
    try {
      const path = "/login";

      const data = await fetcher<{ path: string }>(
        `/api/auth/entry?next=${encodeURIComponent(path)}`,
        {
          method: "POST",
        },
      );
      router.push(data.path);
    } catch (e) {
      handleClientError(e);
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
