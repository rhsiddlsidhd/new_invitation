"use client";

import Spinner from "@/components/atoms/Spinner/Spinner";
import useAuth from "@/hooks/useAuth";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { signOut } from "@/actions/signOut";

const AuthButton = () => {
  const router = useRouter();
  const { isAuth, loading } = useAuth();

  const handlesignOut = async () => {
    await signOut();
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

      router.push(data.payload);
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
