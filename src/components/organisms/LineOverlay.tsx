import { AnimatePresence } from "motion/react";
import React from "react";
import { motion, stagger } from "framer-motion";

const LineOverlay = ({ isView }: { isView: boolean }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.3, { from: "first" }),
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        delayChildren: stagger(0.1, { from: "last" }),
      },
    },
  };
  const backgroundVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: { scale: 0, transition: { duration: 0.1 } },
  };

  const lineVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.6 } },
    exit: { scale: 0, transition: { duration: 0.1 } },
  };

  return (
    <AnimatePresence>
      {isView && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={backgroundVariants}
            className="fixed inset-0 -z-10 bg-black/50"
          />
          <motion.hr
            className="fixed top-[47.5%] left-1/6 w-full origin-left -rotate-30 rounded-2xl border-1 border-white max-sm:w-3/4 max-sm:-rotate-45"
            variants={lineVariants}
          />
          <motion.hr
            className="fixed top-[52.5%] left-1/6 w-full origin-left rotate-30 rounded-2xl border-1 border-white max-sm:w-3/4 max-sm:rotate-45"
            variants={lineVariants}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LineOverlay;
