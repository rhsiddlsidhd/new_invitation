"use client";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion, stagger } from "framer-motion";

const CreateContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isView, setIsView] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Scroll Progress:", latest);
    if (latest > 0.45 && latest < 0.85) {
      setIsView(true);
    } else {
      setIsView(false);
    }
  });

  // opacity 1 상태에서 컬러를 채워 놓고 scale 0 > 1 로 전환

  const content = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.3),
      },
    },
    end: {
      opacity: 0,
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
    end: {
      opacity: 0,
    },
  };

  const menus = ["내 정보 보기", "청첩장 생성하기", "따따블", "연락처"];

  return (
    <div
      className="relative z-20 h-[200vh] w-full overflow-hidden"
      ref={containerRef}
    >
      <AnimatePresence>
        {isView && (
          <motion.div className="fixed top-0 z-10 flex h-full w-full items-center justify-center opacity-100">
            <motion.hr
              className="left-1/6 -rotate-30 absolute top-[47.5%] w-full origin-left rounded-2xl border-2 border-white max-sm:w-3/4 max-sm:-rotate-45"
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
              }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.hr
              className="left-1/6 rotate-30 absolute top-[52.5%] w-full origin-left rounded-2xl border-2 border-white max-sm:w-3/4 max-sm:rotate-45"
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
              }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isView && (
          <motion.ul
            variants={content}
            initial="hidden"
            animate="show"
            exit="end"
            className="right-1/6 fixed top-1/4 space-y-6 border-4 border-black"
          >
            {menus.map((m) => {
              return (
                <motion.li variants={item} key={m}>
                  {m}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateContainer;
