import React from "react";
import { motion } from "framer-motion";
import Img from "../atoms/Img";
import Card from "../atoms/Card";

const PreviewVerticalSlider = () => {
  return (
    <div className="relative w-[240px] overflow-hidden p-2 max-sm:hidden max-sm:w-full">
      <motion.div className="space-y-4">
        {Array.from({ length: 6 }, (_, i) => {
          return (
            <Card key={i} className="h-[300px] w-full">
              <div className="relative h-3/5 w-full">
                <Img src="/marriage.jpg" />
              </div>
              <ul className="p-2">
                <li className="text-lg font-semibold text-[#5B5A57]">title</li>
                <li className="text-sm text-[#8E8E8A]">description</li>
              </ul>
            </Card>
          );
        })}
      </motion.div>
    </div>
  );
};

export default PreviewVerticalSlider;
