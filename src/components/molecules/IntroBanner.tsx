import { introMessage } from "@/contants";
import React from "react";
import { motion, MotionStyle } from "framer-motion";
import Btn from "../atoms/Btn";
import Link from "next/link";

const IntroBanner = ({
  style,
}: {
  style?: React.CSSProperties | MotionStyle;
}) => {
  return (
    <motion.div
      className="z-10 flex max-w-9/10 flex-col items-center gap-4 rounded-lg bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm"
      style={{ ...style }}
    >
      <h1 className="text-4xl font-bold text-gray-800">{introMessage}</h1>
      <Btn
        pending={false}
        className="w-fit text-lg uppercase"
        bgColor="bg-blue-500"
      >
        <Link href={"/detail/rhsiddlsidhd1"}>Sample</Link>
      </Btn>
    </motion.div>
  );
};

export default IntroBanner;
