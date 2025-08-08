"use client";

import React from "react";
import { motion } from "framer-motion";
// className="sticky top-0 flex h-[200vh] w-full bg-white"
// className="relative flex h-[200vh] w-full border-4 border-black bg-white">
const PreviewContainer = () => {
  return (
    <section className="relative flex min-h-fit w-full bg-[#F4F3F0]">
      <div className="sticky top-0 h-screen flex-3/4 shrink-0 grow-0 border-2 border-blue-500 text-[4.5vw]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, illo
        reiciendis! Quod similique alias ab ex commodi sed nemo quia nesciunt
        natus. Beatae commodi amet magnam praesentium libero rerum impedit!
      </div>
      <div className="relative min-w-[160px] flex-1/4 overflow-hidden border-2 border-blue-500 max-sm:hidden">
        <motion.ul>
          <li className="h-[300px] w-full border-4 border-black"></li>
          <li className="h-[300px] w-full border-4 border-black"></li>
          <li className="h-[300px] w-full border-4 border-black"></li>
          <li className="h-[300px] w-full border-4 border-black"></li>
          <li className="h-[300px] w-full border-4 border-black"></li>
          <li className="h-[300px] w-full border-4 border-black"></li>
        </motion.ul>
      </div>
    </section>
  );
};

export default PreviewContainer;
