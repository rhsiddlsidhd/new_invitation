"use client";
import React, { useEffect, useRef, useState } from "react";
import BlurWord from "../molecules/typography/BlurWord";
import { useInView, useMotionValueEvent, useScroll } from "motion/react";

type Direction = "up" | "down";

const Footer = () => {
  // const containerRef = useRef<HTMLDivElement>(null);
  // const isInView = useInView(containerRef);
  // const { scrollY } = useScroll();

  // const [scrollDirection, setScrollDirection] = useState<Direction>("down");

  // useMotionValueEvent(scrollY, "change", (current) => {
  //   const previous = scrollY.getPrevious() ?? 0;

  //   const diff = current - previous;

  //   setScrollDirection(diff > 0 ? "down" : "up");
  // });

  return (
    <div
      className="relative z-50 h-screen w-full bg-black text-white"
      // ref={containerRef}
    >
      <div className="flex h-[25vh] items-center justify-center">
        <BlurWord word="contact" />
      </div>
    </div>
  );
};

export default Footer;
