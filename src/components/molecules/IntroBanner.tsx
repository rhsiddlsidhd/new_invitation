import { introMessage } from "@/contants";
import React from "react";
import { motion } from "framer-motion";
import Btn from "../atoms/Btn";

const IntroBanner = ({ isVisible }: { isVisible: boolean }) => {
  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: isVisible ? 1 : 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={variants}
      className="z-10 rounded-lg bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm"
    >
      <h1 className="mb-4 text-4xl font-bold text-gray-800">{introMessage}</h1>
      <Btn pending={false} bgColor="bg-blue-500">
        Sample
      </Btn>
    </motion.div>
  );
};

export default IntroBanner;
