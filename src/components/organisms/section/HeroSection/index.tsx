"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useTransform, useSpring, MotionValue } from "framer-motion";
import HeroBox from "@/components/molecules/boxs/HeroBox";
import Img from "@/components/atoms/Img";
import { generateParticles } from "@/utils/animation";
import Card from "@/components/atoms/Card";
import { squareSizes } from "@/constant";
import { particleContainer, particleItem } from "@/style/variants";

const HeroSection = ({
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
  const particles = useMemo(() => generateParticles(16), []);

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
        <motion.div
          className="z-10 max-w-9/10 shadow-lg backdrop-blur-sm"
          style={{ y, opacity: bannerOpacity }}
        >
          <HeroBox />
        </motion.div>
        <motion.div
          variants={particleContainer}
          initial="hidden"
          animate="show"
          className="absolute top-0 left-0 h-full w-full perspective-distant transform-3d"
          style={{ scale, opacity }}
        >
          {particles.map((particle, i) => {
            return (
              <Card
                key={i}
                custom={particle}
                variants={particleItem}
                className={`${squareSizes[particle.size]} absolute -z-10`}
                onAnimationComplete={() => {
                  if (i === particles.length - 1) setShowBanner(true);
                }}
              >
                <Img src="/marriage.jpg" />
              </Card>
            );
          })}
        </motion.div>
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

export default HeroSection;
