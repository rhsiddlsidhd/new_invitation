"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import PreviewHorizonalSlider from "../molecules/PreviewHorizonalSlider";
import PreviewVerticalSlider from "../molecules/PreviewVerticalSlider";

const PreviewContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: scrollYProgressCenter } = useScroll({
    target: containerRef,
    offset: ["start start", "center end"],
  });

  const { scrollYProgress: scrollYProgressEnd } = useScroll({
    target: containerRef,
    offset: ["center end", "end end"],
  });

  useMotionValueEvent(scrollYProgressEnd, "change", (latest) =>
    console.log("Scroll Y Progress:", latest),
  );

  const y = useTransform(scrollYProgressEnd, [0, 1], ["50%", "-60%"]);

  // className="relative z-20 flex w-full max-sm:block max-sm:h-[200vh] sm:p-2"
  return (
    <motion.section
      initial={{ backgroundColor: "#E7E6E2" }}
      className="relative z-20 h-[500vh] w-full"
      ref={containerRef}
    >
      <div className="flex h-full max-sm:block">
        <div className="sticky top-0 flex-3/4 shrink grow overflow-hidden text-[4.5vw] max-sm:top-1/4 max-sm:flex max-sm:flex-col sm:h-screen">
          <p className="max-sm:p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            illo reiciendis! Quod similique alias ab ex commodi sed nemo quia
            nesciunt natus. Beatae commodi amet magnam praesentium libero rerum
            impedit!
          </p>
          <PreviewHorizonalSlider scrollYProgress={scrollYProgressCenter} />
        </div>
        <PreviewVerticalSlider scrollYProgress={scrollYProgressCenter} />
      </div>
      <motion.div
        style={{ y }}
        className="fixed top-0 left-1/2 z-10 h-[200vh] w-11/12 -translate-x-1/2 border-2 border-white bg-white"
      ></motion.div>
    </motion.section>
  );
};

export default PreviewContainer;
