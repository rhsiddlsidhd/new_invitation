"use client";

import { useInView, useMotionValueEvent, useScroll } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface SnapBoxProps {
  height?: number;
  zIndex?: number;
  triggerOnce?: boolean;
  children: React.ReactNode;
  className?: string;
}

type ScrollDirection = "up" | "down";

const ScrollViewBox = ({
  triggerOnce = false,
  zIndex = 0,
  height,
  children,
  className,
}: SnapBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("down");
  useMotionValueEvent(scrollY, "change", (current) => {
    const prev = scrollY.getPrevious() ?? 0;
    const diff = current - prev;
    setScrollDirection(diff > 0 ? "down" : "up");
  });
  const isInView = useInView(boxRef, {
    amount: "some",
    once: triggerOnce,
  });

  useEffect(() => {
    if (scrollDirection === "up") return;
    if (isInView && !hasScrolled) {
      if (!boxRef.current) return;
      boxRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setHasScrolled(true);
    }
    if (!isInView) {
      setHasScrolled(false);
    }
  }, [isInView, scrollDirection, hasScrolled]);
  return (
    <div
      ref={boxRef}
      style={{
        height: `${height ? `${height}vh` : "h-fit"}`,
        pointerEvents: `${isInView ? "auto" : "none"}`,
      }}
      className={`relative w-full overflow-hidden z-[${zIndex}] ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollViewBox;
