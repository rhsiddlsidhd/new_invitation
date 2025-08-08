import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import Card from "../atoms/Card";
import Img from "../atoms/Img";

const PreviewHorizonalSlider = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const horizonalContainerRef = useRef<HTMLUListElement>(null);

  const [horizonalScrollWidth, setHorizonalScrollWidth] = useState<number>(0);
  const CARDWIDTH = 320;
  const totalScrollWidth = horizonalScrollWidth - CARDWIDTH;
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalScrollWidth]);

  const updatedScrollWidth = (width: number) => {
    setHorizonalScrollWidth(width);
  };

  useEffect(() => {
    if (!horizonalContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!horizonalContainerRef.current) return;
      updatedScrollWidth(horizonalContainerRef.current.scrollWidth);
    });

    resizeObserver.observe(horizonalContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
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
            >
              <div className="relative h-3/5 w-full">
                <Img src="/marriage.jpg" />
              </div>
              <h1>title</h1>
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
};

export default PreviewHorizonalSlider;
