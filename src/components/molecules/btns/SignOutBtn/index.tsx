"use client";
import { signOut } from "@/domains/auth/actions";
import Btn from "@/components/atoms/Btn";
import { useAuthStore } from "@/domains/auth/store";
import { useRouter } from "next/navigation";

import React, { useCallback } from "react";

const SignOutBtn = ({
  children,
  bgColor,
  textColor,
}: {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}) => {
  const { setIsAuthenticated } = useAuthStore();
  const router = useRouter();
  const handleSignOut = useCallback(async () => {
    await signOut();
    router.replace("/");
    setIsAuthenticated(false);
  }, [setIsAuthenticated, router]);
  return (
    <Btn bgColor={bgColor} textColor={textColor} onClick={handleSignOut}>
      {children}
    </Btn>
  );
};

export default SignOutBtn;
