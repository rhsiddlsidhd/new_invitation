import { useInView } from "motion/react";
import React, { useRef } from "react";
import { motion } from "framer-motion";

const AnimateViewBox = ({
  children,
  triggerOnce = false,
  height,
  className,
}: {
  children: React.ReactNode;
  triggerOnce?: boolean;
  height?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.35, once: triggerOnce });

  return (
    <motion.div
      style={{ height: height ? `${height}vh` : `h-fit` }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      ref={ref}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimateViewBox;
