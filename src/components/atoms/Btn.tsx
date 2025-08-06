"use client";
import React from "react";

const Btn = ({
  pending,
  children,
  onClick,

  bgColor = "bg-black",
}: {
  pending: boolean;
  children: React.ReactNode;

  onClick?: () => void;
  bgColor?: string;
}) => {
  return (
    <button
      disabled={pending}
      className={`w-full cursor-pointer rounded-sm border-2 border-none p-2 text-white ${
        pending ? "bg-gray-400" : bgColor
      } ${pending ? "cursor-not-allowed" : "hover:opacity-80"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Btn;
