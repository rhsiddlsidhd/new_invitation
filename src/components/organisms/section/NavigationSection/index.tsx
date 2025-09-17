"use client";

import { useMotionValueEvent } from "motion/react";
import React, { useRef, useState } from "react";
import { AnimatePresence, MotionValue, useTransform } from "framer-motion";
import NavigationMenu from "@/components/molecules/navigation/NavigationMenu/index";
import {
  lineOverlay,
  lineOverlayContainer,
  lineOverlayItem,
} from "@/style/variants";
import { motion } from "framer-motion";

const NavigationSection = ({
  offsetStart,
  offsetEnd,
  scrollY,
  height,
}: {
  offsetStart: number;
  offsetEnd: number;
  scrollY: MotionValue<number>;
  height: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isView, setIsView] = useState<boolean>(false);
  const [textView, setTextView] = useState<"hidden" | "show" | "pending">(
    "hidden",
  );

  const y = useTransform(scrollY, [offsetStart, offsetEnd], [0, 1]);

  useMotionValueEvent(y, "change", (latest) => {
    setIsView(latest > 0.1 && latest < 0.5);
    setTextView(latest >= 0.5 ? "pending" : latest > 0.2 ? "show" : "hidden");
  });

  return (
    <div className={`relative z-10 h-[${height}vh]`} ref={containerRef}>
      <AnimatePresence>
        {isView && (
          <motion.div
            variants={lineOverlayContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={lineOverlay}
              className="fixed inset-0 -z-10 bg-black/50"
            />
            <motion.hr
              className="fixed top-[47.5%] left-1/6 w-full origin-left -rotate-30 rounded-2xl border-1 border-white max-sm:w-3/4 max-sm:-rotate-45"
              variants={lineOverlayItem}
            />
            <motion.hr
              className="fixed top-[52.5%] left-1/6 w-full origin-left rotate-30 rounded-2xl border-1 border-white max-sm:w-3/4 max-sm:rotate-45"
              variants={lineOverlayItem}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <NavigationMenu textView={textView} />
    </div>
  );
};

export default NavigationSection;
