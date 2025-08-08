"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
// className="sticky top-0 flex h-[200vh] w-full bg-white"
// className="relative flex h-[200vh] w-full border-4 border-black bg-white">
const PreviewContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizonalContainerRef = useRef<HTMLUListElement>(null);
  const [horizonalScrollWidth, setHorizonalScrollWidth] = useState<number>(0);

  const CARDWIDTH = 320;
  const totalScrollWidth = horizonalScrollWidth - CARDWIDTH;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalScrollWidth]);

  useEffect(() => {
    const updatedScrollWidth = () => {
      if (!horizonalContainerRef.current) return;
      const width = horizonalContainerRef.current.scrollWidth;
      setHorizonalScrollWidth(width);
    };

    updatedScrollWidth();
    window.addEventListener("resize", updatedScrollWidth);
    return () => window.removeEventListener("resize", updatedScrollWidth);
  }, []);

  return (
    <section
      className="relative z-20 flex w-full bg-[#F4F3F0] max-sm:block max-sm:h-[200vh]"
      ref={containerRef}
    >
      <div className="flex-3/4 sticky top-0 h-screen shrink grow-0 bg-red-300 text-[4.5vw] max-sm:top-[6rem]">
        <p className="max-sm:mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
          illo reiciendis! Quod similique alias ab ex commodi sed nemo quia
          nesciunt natus. Beatae commodi amet magnam praesentium libero rerum
          impedit!
        </p>
        <div className="overflow-hidden sm:hidden">
          <motion.ul
            ref={horizonalContainerRef}
            style={{ x }}
            className="flex h-full flex-nowrap"
          >
            {Array.from({ length: 6 }, (_, i) => {
              return (
                <li
                  key={i}
                  className="h-[300px] w-[320px] shrink-0 border-4 border-black"
                ></li>
              );
            })}
          </motion.ul>
        </div>
      </div>

      <div className="flex-1/4 relative min-w-[320px] overflow-hidden border-2 border-blue-500 max-sm:hidden max-sm:w-full">
        <motion.ul>
          {Array.from({ length: 6 }, (_, i) => {
            return (
              <li
                key={i}
                className="h-[300px] w-full border-4 border-black"
              ></li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default PreviewContainer;
