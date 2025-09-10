"use client";
import { signOut } from "@/actions/auth";
import Btn from "@/components/atoms/Btn";
import useAuthStore from "@/store/authStore";
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
  const handleSignOut = useCallback(async () => {
    await signOut();
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);
  return (
    <Btn bgColor={bgColor} textColor={textColor} onClick={handleSignOut}>
      {children}
    </Btn>
  );
};

export default SignOutBtn;
