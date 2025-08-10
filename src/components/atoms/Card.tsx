"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Post } from "@/types";

interface CardProps {
  custom?: Post;
  variants?: Variants;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  onAnimationComplete?: () => void;
}

const Card: React.FC<CardProps> = ({
  custom,
  variants,
  children,
  style,
  onClick,
  onAnimationComplete,
  className = "",
}) => {
  return (
    <motion.div
      className={`bg-transparent ${className}`}
      style={{
        ...style,
      }}
      variants={variants}
      custom={custom}
      onClick={onClick}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  );
};

export default Card;
