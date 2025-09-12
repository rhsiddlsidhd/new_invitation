"use client";
import React, { useEffect, useState } from "react";
import { SignOutIcon, UserIcon } from "@/components/atoms/Icon";
import SignOutBtn from "../SignOutBtn";
import SignInBtn from "../SignInBtn";
import useAuthStore from "@/store/authStore";
import Spinner from "@/components/atoms/Spinner";

const AuthToggleBtn = () => {
  const [pending, setPending] = useState<boolean>(true);

  const { setIsAuthenticated, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchAuthenticate = async () => {
      try {
        const res = await fetch("/api/auth", { cache: "no-store" });
        if (!res.ok) throw new Error("Auth fetch failed");
        const data = await res.json();
        setIsAuthenticated(data.success);
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "알 수 없는 에러가 발생했습니다.";
        console.error(message);
        setIsAuthenticated(false);
      } finally {
        setPending(false);
      }
    };
    setPending(true);
    fetchAuthenticate();
  }, [setIsAuthenticated]);

  if (pending) return <Spinner />;
  return (
    <div>
      {isAuthenticated ? (
        <SignOutBtn bgColor="bg-transparent" textColor="text-black">
          <SignOutIcon size={24} />
        </SignOutBtn>
      ) : (
        <SignInBtn bgColor="bg-transparent" textColor="text-black">
          <UserIcon size={24} />
        </SignInBtn>
      )}
    </div>
  );
};

export default AuthToggleBtn;
