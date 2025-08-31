"use client";

import { useInView, useMotionValueEvent, useScroll } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface SnapBoxProps {
  height?: number;
  zIndex?: number;
  triggerOnce?: boolean;
  children: React.ReactNode;
}

type ScrollDirection = "up" | "down";

const ScrollViewBox = ({
  triggerOnce = false,
  zIndex = 0,

  height,
  children,
}: SnapBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("down");
  useMotionValueEvent(scrollY, "change", (current) => {
    const prev = scrollY.getPrevious() ?? 0;
    const diff = current - prev;
    setScrollDirection(diff > 0 ? "down" : "up");
  });
  const isInView = useInView(boxRef, {
    amount: 0.175,
    once: triggerOnce,
  });

  useEffect(() => {
    if (scrollDirection === "up") return;
    if (isInView) {
      if (!boxRef.current) return;
      boxRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isInView, scrollDirection]);
  return (
    <div
      ref={boxRef}
      style={{
        height: `${height}vh`,
      }}
      className={`relative w-full overflow-hidden z-[${zIndex}]`}
    >
      {children}
    </div>
  );
};

export default ScrollViewBox;
