"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import { useSignOut } from "@/hooks/useSignOut";
import { LogOut } from "lucide-react";

import React from "react";

const SignOutBtn = () => {
  const { handleSignOut } = useSignOut();

  return (
    <Btn
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-foreground w-full justify-center"
      onClick={handleSignOut}
    >
      <LogOut className="mr-2 h-4 w-4" />
      로그아웃
    </Btn>
  );
};

export default SignOutBtn;
