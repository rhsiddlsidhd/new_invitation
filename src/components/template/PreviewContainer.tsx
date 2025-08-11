"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import PreviewHorizonalSlider from "../molecules/PreviewHorizonalSlider";
import PreviewVerticalSlider from "../molecules/PreviewVerticalSlider";
import TemplateGallery from "../organisms/TemplateGallery";

const PreviewContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: scrollYProgressCenter } = useScroll({
    target: containerRef,
    offset: ["start start", "center end"],
  });

  const { scrollYProgress: scrollYProgressEnd } = useScroll({
    target: containerRef,
    offset: ["center end", "end end"],
  });

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
      <TemplateGallery scroll={scrollYProgressEnd} />
    </motion.section>
  );
};

export default PreviewContainer;
