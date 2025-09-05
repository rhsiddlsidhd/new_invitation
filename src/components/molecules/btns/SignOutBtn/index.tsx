import { signOut } from "@/actions/auth";
import Btn from "@/components/atoms/Btn";
import React from "react";

const SignOutBtn = ({ children }: { children: React.ReactNode }) => {
  return (
    <Btn bgColor="bg-[#dc3545]" onClick={signOut}>
      {children}
    </Btn>
  );
};

export default SignOutBtn;
