"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import PreviewHorizonalSlider from "../molecules/PreviewHorizonalSlider";
import PreviewVerticalSlider from "../molecules/PreviewVerticalSlider";
import TemplateGallery from "../organisms/TemplateGallery";
import Card from "../atoms/Card";
import Img from "../atoms/Img";

type ViewState = "hidden" | "show";

const Word = ({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
}) => {
  const clipPath = useTransform(progress, range, [
    "inset(0 100% 0 0)",
    "inset(0 0% 0 0)",
  ]);

  const springClipPath = useSpring(clipPath);

  return (
    <motion.span style={{ clipPath }} className="inline-block">
      {children}
    </motion.span>
  );
};

const PreviewContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTemplateGallery, setIsTemplateGallery] = useState<boolean>(false);
  const [isViewScratch, setIsViewScratch] = useState<ViewState>("hidden");

  const { scrollYProgress } = useScroll({
    target: containerRef,

    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const value = latest > 0 && latest < 1 ? "show" : "hidden";
    setIsViewScratch(value);
  });

  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo reiciendis! Quod similique alias ab ex commodi sed nemo quianesciunt natus. Beatae commodi amet magnam praesentium libero rerumimpedit!";

  return (
    <motion.section
      initial={{ backgroundColor: "#E7E6E2" }}
      style={{ height: "100%" }}
      ref={containerRef}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isViewScratch === "show" ? 1 : 0 }}
        // className="fixed top-0 h-screen w-5/7 font-extrabold max-sm:top-1/6 max-sm:w-full"
        className="fixed top-0 h-screen w-full font-extrabold max-sm:top-1/6"
      >
        <p
          style={{ fontSize: "clamp(2vw,5vw,6rem)" }}
          className="absolute flex w-full flex-wrap gap-x-2 p-2 text-white opacity-20"
        >
          {text.split(" ").map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </p>

        <motion.p
          style={{ fontSize: "clamp(2vw,5vw,6rem)" }}
          className="absolute flex w-full flex-wrap gap-x-2 p-2 text-gray-300"
        >
          {text.split(" ").map((char, index, arr) => {
            const startRange = (index / arr.length) * 0.45;
            const endRange = ((index + 1) / arr.length) * 0.45;
            return (
              <Word
                key={index}
                progress={scrollYProgress}
                range={[startRange, endRange]}
              >
                {char}
              </Word>
            );
          })}
        </motion.p>
      </motion.div>

      {/* <PreviewVerticalSlider isViewScratch={isViewScratch} /> */}

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isTemplateGallery ? 0 : 1,
        }}
        transition={{ delay: 0.6, ease: "easeOut" }}
      >
        <TemplateGallery scroll={scrollYProgressEnd} />
      </motion.div> */}
    </motion.section>
  );
};

export default PreviewContainer;

/**
 * 
 * <div className="flex h-full max-sm:block">
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
 * 
 */
