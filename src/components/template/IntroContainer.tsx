"use client";

import React, { useRef, useState } from "react";
import IntroBanner from "../molecules/IntroBanner";
import PostBoard from "../molecules/PostBoard";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Img from "../atoms/Img";
import { Post } from "@/types";

const IntroContainer = ({ posts }: { posts: Post[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showBanner, setShowBanner] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 3]), {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0]), {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]), {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  const bannerOpacity = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      [showBanner ? 1 : 0, showBanner ? 0 : 0],
    ),
    {
      stiffness: 100,
      damping: 30,
      mass: 1,
    },
  );

  const lateScale = useSpring(useTransform(scrollYProgress, [0.5, 1], [0, 1]), {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  return (
    <div style={{ height: "100%" }} ref={containerRef}>
      <motion.div className="fixed top-0 flex h-screen w-full items-center justify-center">
        <IntroBanner style={{ y, opacity: bannerOpacity }} />
        <PostBoard
          posts={posts}
          callback={() => setShowBanner(true)}
          style={{ scale, opacity }}
        />
        <motion.div
          style={{
            scale: lateScale,
            filter: "brightness(0.85)",
          }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <Img src="/marriage.jpg" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroContainer;
