import React from "react";
import { motion } from "framer-motion";

const Overlay = ({
  children,
  isOpen,
  bgColor,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  bgColor?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 flex items-center justify-center backdrop-blur-md ${bgColor ? bgColor : "bg-black/50"} ${isOpen ? "pointer-events-auto" : "pointer-events-none"} z-50`}
    >
      {children}
    </motion.div>
  );
};

export default Overlay;
