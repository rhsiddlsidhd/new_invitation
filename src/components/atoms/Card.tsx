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
  ref?: React.Ref<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({
  custom,
  variants,
  children,
  style,
  onClick,
  onAnimationComplete,
  ref,
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
      ref={ref}
    >
      {children}
    </motion.div>
  );
};

export default Card;
