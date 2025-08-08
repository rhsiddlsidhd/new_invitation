import React from "react";
import { motion } from "framer-motion";
import Img from "../atoms/Img";

const PreviewVerticalSlider = () => {
  return (
    <div className="flex-1/4 relative min-w-[320px] overflow-hidden border-2 border-blue-500 max-sm:hidden max-sm:w-full">
      <motion.ul>
        {Array.from({ length: 6 }, (_, i) => {
          return (
            <li key={i} className="h-[300px] w-full border-4 border-black">
              <div className="relative h-3/5 w-full">
                <Img src="/marriage.jpg" />
              </div>
              <h1>title</h1>
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
};

export default PreviewVerticalSlider;
