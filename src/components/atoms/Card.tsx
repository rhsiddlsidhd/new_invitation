"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Post } from "@/types";

interface CardProps {
  post?: Post;
  variants?: Variants;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onAnimationComplete?: () => void;
}

const Card: React.FC<CardProps> = ({
  post,
  variants,
  children,
  style,
  onAnimationComplete,
  className = "",
}) => {
  return (
    <motion.div
      className={`border-2 border-gray-300 bg-blue-100 text-lg font-bold transition-all duration-1000 ease-out hover:scale-110 ${className}`}
      style={{
        ...style,
      }}
      variants={variants}
      custom={post}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  );
};

export default Card;
