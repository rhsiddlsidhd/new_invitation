"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { recommendedText } from "@/contants";

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

const RecommendedSection = ({
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

  return (
    <section className="h-full bg-[#E7E6E2]" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isViewScratch === "show" ? 1 : 0 }}
        className="fixed top-0 h-screen w-full font-extrabold max-sm:top-1/6"
      >
        <p
          style={{ fontSize: "clamp(2vw,5vw,6rem)" }}
          className="absolute flex w-full flex-wrap gap-x-2 p-2 text-white opacity-20"
        >
          {recommendedText.split(" ").map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </p>

        <motion.p
          style={{ fontSize: "clamp(2vw,5vw,6rem)" }}
          className="absolute flex w-full flex-wrap gap-x-2 p-2 text-gray-300"
        >
          {recommendedText.split(" ").map((char, index, arr) => {
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
    </section>
  );
};

export default RecommendedSection;
