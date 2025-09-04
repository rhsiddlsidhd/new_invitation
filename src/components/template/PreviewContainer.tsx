"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

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

  return (
    <motion.span style={{ clipPath }} className="inline-block">
      {children}
    </motion.span>
  );
};

const PreviewContainer = ({
  offsetStart,
  offsetEnd,
  scrollY,
}: {
  offsetStart: number;
  offsetEnd: number;
  scrollY: MotionValue<number>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isViewScratch, setIsViewScratch] = useState<ViewState>("hidden");

  const y = useTransform(scrollY, [offsetStart, offsetEnd], [0, 1]);

  useMotionValueEvent(y, "change", (latest) => {
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
              <Word key={index} progress={y} range={[startRange, endRange]}>
                {char}
              </Word>
            );
          })}
        </motion.p>
      </motion.div>

      {/* <PreviewVerticalSlider isViewScratch={isViewScratch} /> */}
      {/* 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isViewScratch === "hidden" ? 0 : 1,
        }}
        transition={{ delay: 0.6, ease: "easeOut" }}
      >
        <TemplateGallery scroll={scrollYProgress} />
      </motion.div> */}
    </motion.section>
  );
};

export default PreviewContainer;
