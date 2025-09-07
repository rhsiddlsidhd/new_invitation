import React from "react";
import Box from "@/components/layout/Box/index";
import { motion, MotionStyle } from "framer-motion";
import { introMessage } from "@/contants";
import SampleBtn from "@/components/molecules/btns/SampleBtn/index";

const HeroBox = ({ style }: { style?: React.CSSProperties | MotionStyle }) => {
  return (
    <motion.div
      className="z-10 max-w-9/10 shadow-lg backdrop-blur-sm"
      style={{ ...style }}
    >
      <Box className="grid grid-cols-1 place-items-center gap-4">
        <h1 className="text-center text-4xl font-bold text-gray-800">
          {introMessage}
        </h1>
        <SampleBtn />
      </Box>
    </motion.div>
  );
};

export default HeroBox;
