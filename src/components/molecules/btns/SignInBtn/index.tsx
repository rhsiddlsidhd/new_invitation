"use client";
import Btn from "@/components/atoms/Btn";
import { useModalStore } from "@/shared/store";
import React from "react";

const SignInBtn = ({
  children,
  bgColor,
  textColor,
}: {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}) => {
  const { setModalOpen } = useModalStore();
  return (
    <Btn
      bgColor={bgColor}
      textColor={textColor}
      onClick={() => setModalOpen({ isOpen: true, type: "login" })}
    >
      {children}
    </Btn>
  );
};

export default SignInBtn;
