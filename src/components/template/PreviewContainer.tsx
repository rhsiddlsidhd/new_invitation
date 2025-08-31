"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import PreviewHorizonalSlider from "../molecules/PreviewHorizonalSlider";
import PreviewVerticalSlider from "../molecules/PreviewVerticalSlider";
import TemplateGallery from "../organisms/TemplateGallery";

const PreviewContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTemplateGallery, setIsTemplateGallery] = useState<boolean>(false);

  const { scrollYProgress: scrollYProgressCenter } = useScroll({
    target: containerRef,
    offset: ["start start", "center end"],
  });

  const { scrollYProgress: scrollYProgressEnd } = useScroll({
    target: containerRef,
    offset: ["center end", "end end"],
  });

  useMotionValueEvent(scrollYProgressEnd, "change", (latest) => {
    console.log("latest", latest);
    const isScrollEnd = latest === 1;
    console.log("isScrollEnd", isScrollEnd);
    setIsTemplateGallery((prev) => (prev !== isScrollEnd ? isScrollEnd : prev));
  });

  return (
    <motion.section
      initial={{ backgroundColor: "#E7E6E2" }}
      style={{ height: "100%" }}
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
        initial={{ opacity: 0 }}
        animate={{
          opacity: isTemplateGallery ? 0 : 1,
        }}
        transition={{ delay: 0.6, ease: "easeOut" }}
      >
        <TemplateGallery scroll={scrollYProgressEnd} />
      </motion.div>
    </motion.section>
  );
};

export default PreviewContainer;
