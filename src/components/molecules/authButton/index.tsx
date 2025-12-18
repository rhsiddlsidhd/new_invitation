"use client";

import { signOut } from "@/domains/auth/actions";
import Spinner from "@/components/atoms/Spinner";
import { useAuth } from "@/domains/auth/hooks";
import { useAuthStore } from "@/domains/auth/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const router = useRouter();
  const { isAuth, loading } = useAuth();
  const { setIsAuthenticated } = useAuthStore();
  const handlesignOut = async () => {
    await signOut();
    setIsAuthenticated(false);
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
