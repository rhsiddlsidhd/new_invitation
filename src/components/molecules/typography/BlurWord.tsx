"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * 문자가 모여서 단어가 되고 단어가 모여 문장이 되고 문장이 모여 글이 된다.
 * typography = 문자와 관련된 molecules
 * 해당 컴포넌트는 Animate 를 포함한 하나의 문자가 모여 단어가 된 컴포넌트이다
 */

const BlurWord = ({ word }: { word: string }) => {
  const delays = React.useMemo(
    () => [...word].map(() => Math.random() * 0.6),
    [word],
  );

  return (
    <AnimatePresence>
      {[...word].map((char, i) => (
        <motion.span
          initial={{ filter: "blur(4px)", opacity: 0.7 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{
            duration: 1.2,
            delay: delays[i],
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="text-[10vw] font-bold tracking-widest uppercase"
          key={i}
        >
          {char}
        </motion.span>
      ))}
    </AnimatePresence>
  );
};

export default BlurWord;
