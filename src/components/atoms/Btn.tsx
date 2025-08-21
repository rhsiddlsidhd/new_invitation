"use client";
import React from "react";
import { motion } from "framer-motion";

const Btn = ({
  pending,
  children,
  onClick,
  className,
  type = "button",
  textColor,
  bgColor = "bg-black",
}: {
  pending?: boolean;
  className?: string;
  textColor?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  bgColor?: string;
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      type={type}
      disabled={pending}
      className={`cursor-pointer rounded-sm border-2 border-none p-2 ${textColor ?? "text-white"} ${
        pending ? "bg-gray-400" : bgColor
      } ${pending ? "cursor-not-allowed" : "hover:opacity-80"} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Btn;
