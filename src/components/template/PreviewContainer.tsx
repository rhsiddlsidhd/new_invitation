"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";

import PreviewHorizonalSlider from "../molecules/PreviewHorizonalSlider";
import PreviewVerticalSlider from "../molecules/PreviewVerticalSlider";

const PreviewContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <motion.section
      initial={{ backgroundColor: "#F4F3F0" }}
      className="relative z-20 flex w-full p-4 max-sm:block max-sm:h-[200vh]"
      ref={containerRef}
    >
      <div className="flex-3/4 sticky top-0 h-screen shrink grow-0 text-[4.5vw] max-sm:top-[6rem]">
        <p className="max-sm:mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
          illo reiciendis! Quod similique alias ab ex commodi sed nemo quia
          nesciunt natus. Beatae commodi amet magnam praesentium libero rerum
          impedit!
        </p>
        <PreviewHorizonalSlider scrollYProgress={scrollYProgress} />
      </div>
      <PreviewVerticalSlider />
    </motion.section>
  );
};

export default PreviewContainer;
