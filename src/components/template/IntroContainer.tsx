"use client";

import React, { useRef, useState } from "react";
import { motion, useTransform, useSpring, MotionValue } from "framer-motion";
import Img from "../atoms/Img";
import FloatingCard from "../molecules/FloatingCard";
import HeroBox from "../molecules/boxs/HeroBox";

const IntroContainer = ({
  offsetStart,
  offsetEnd,
  scrollY,
}: {
  offsetStart: number;
  offsetEnd: number;
  scrollY: MotionValue<number>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showBanner, setShowBanner] = useState(false);

  const scale = useSpring(
    useTransform(scrollY, [offsetStart, offsetEnd], [1, 3]),
    {
      stiffness: 100,
      damping: 30,
      mass: 1,
    },
  );

  const opacity = useSpring(
    useTransform(scrollY, [offsetStart, offsetEnd], [1, 0]),
    {
      stiffness: 100,
      damping: 30,
      mass: 1,
    },
  );

  const y = useSpring(
    useTransform(scrollY, [offsetStart, offsetEnd], ["0%", "-300%"]),
    {
      stiffness: 100,
      damping: 30,
      mass: 1,
    },
  );

  const bannerOpacity = useSpring(
    useTransform(
      scrollY,
      [offsetStart, offsetEnd * 0.5],
      [showBanner ? 1 : 0, showBanner ? 0 : 0],
    ),
    {
      stiffness: 100,
      damping: 30,
      mass: 1,
    },
  );

  const lateScale = useSpring(
    useTransform(scrollY, [offsetEnd * 0.5, offsetEnd], [0, 1]),
    {
      stiffness: 100,
      damping: 30,
      mass: 1,
    },
  );

  return (
    <div style={{ height: "100%" }} ref={containerRef}>
      <div className="fixed top-0 flex h-screen w-full items-center justify-center">
        <HeroBox style={{ y, opacity: bannerOpacity }} />
        <FloatingCard
          callback={() => setShowBanner(true)}
          style={{ scale, opacity }}
        />
        <motion.div
          style={{
            scale: lateScale,
          }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <Img src="/marriage.jpg" />
        </motion.div>
      </div>
    </div>
  );
};

export default IntroContainer;
