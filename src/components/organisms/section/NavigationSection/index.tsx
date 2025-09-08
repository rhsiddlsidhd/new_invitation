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
}: {
  offsetStart: number;
  offsetEnd: number;
  scrollY: MotionValue<number>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isView, setIsView] = useState<boolean>(false);
  const [textView, setTextView] = useState<"hidden" | "show" | "pending">(
    "hidden",
  );

  const y = useTransform(scrollY, [offsetStart, offsetEnd], [0, 1]);

  useMotionValueEvent(y, "change", (latest) => {
    const viewState = latest > 0.1 && latest < 0.5;
    const textState =
      latest >= 0.5 ? "pending" : latest > 0.2 ? "show" : "hidden";

    setIsView((prev) => (prev !== viewState ? viewState : prev));
    setTextView((prev) => (prev !== textState ? textState : prev));
  });

  return (
    <div
      style={{ height: "100%" }}
      className="relative z-10"
      ref={containerRef}
    >
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
