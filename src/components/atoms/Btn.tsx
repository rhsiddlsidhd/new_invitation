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
  tap = true,
}: {
  pending?: boolean;
  className?: string;
  textColor?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  tap?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  bgColor?: string;
}) => {
  return (
    <motion.button
      whileTap={{ scale: tap ? 0.95 : 1 }}
      type={type}
      disabled={pending}
      className={`min-w-fit cursor-pointer rounded-sm border-2 border-none p-2 ${textColor ?? "text-white"} ${
        pending ? "bg-gray-400" : bgColor
      } ${pending ? "cursor-not-allowed" : "hover:opacity-80"} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Btn;
