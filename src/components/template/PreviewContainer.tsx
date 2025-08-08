"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

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
      initial={{ backgroundColor: "#E7E6E2" }}
      className="relative z-20 flex w-full max-sm:block max-sm:h-[200vh] sm:p-2"
      ref={containerRef}
    >
      <div className="sticky top-0 flex-3/4 shrink grow overflow-hidden text-[4.5vw] max-sm:top-1/4 max-sm:flex max-sm:flex-col sm:h-screen">
        <p className="max-sm:p-2">
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
