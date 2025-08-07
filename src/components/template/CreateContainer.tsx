"use client";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const CreateContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isView, setIsView] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Scroll Progress:", latest);
    if (latest > 0.5 && latest < 0.9) {
      setIsView(true);
    } else {
      setIsView(false);
    }
  });

  return (
    <div
      className="relative z-20 h-[200vh] w-full overflow-hidden"
      ref={containerRef}
    >
      {isView && (
        <motion.div className="fixed top-0 z-10 flex h-full w-full items-center justify-center">
          <motion.hr
            className="absolute w-full -rotate-30 border-1 border-white max-sm:w-3/4 max-sm:-rotate-45"
            style={{
              top: "47.5%",
              transformOrigin: "left center",
              left: "15%",
            }}
          />
          <motion.hr
            className="absolute w-full rotate-30 border-1 border-white max-sm:w-3/4 max-sm:rotate-45"
            style={{
              top: "52.5%",
              transformOrigin: "left center",
              left: "15%",
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CreateContainer;
