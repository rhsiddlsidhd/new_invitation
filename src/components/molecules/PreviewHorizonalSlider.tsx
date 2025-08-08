import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";

import Img from "../atoms/Img";
import Card from "../atoms/Card";

const PreviewHorizonalSlider = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const horizonalContainerRef = useRef<HTMLDivElement>(null);

  const [horizonalScrollWidth, setHorizonalScrollWidth] = useState<number>(0);
  const CARDWIDTH = 320;
  const totalScrollWidth = horizonalScrollWidth - CARDWIDTH;

  // 기본 transform
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -totalScrollWidth]);

  // Spring으로 부드럽게 만들기
  const x = useSpring(xRaw, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

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
      <motion.div
        ref={horizonalContainerRef}
        style={{ x }}
        className="flex h-full flex-nowrap"
      >
        {Array.from({ length: 6 }, (_, i) => {
          return (
            <Card key={i} className="h-[300px] w-[240px] shrink-0 p-4">
              <div className="relative h-3/5 w-full">
                <Img src="/marriage.jpg" />
              </div>
              <ul className="p-2">
                <li className="text-lg font-semibold text-[#5B5A57]">title</li>
                <li className="text-sm text-[#8E8E8A]">description</li>
              </ul>
            </Card>
          );
        })}
      </motion.div>
    </div>
  );
};

export default PreviewHorizonalSlider;
