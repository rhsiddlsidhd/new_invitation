"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Btn from "@/components/atoms/Btn";
import { useGetProductfont, useSetProductFont } from "@/domains/product/store";

const DropdownBtn = ({ options }: { options: string[] }) => {
  const [isToggle, setIsToggle] = useState(false);
  const text = useGetProductfont();
  const setText = useSetProductFont();
  const handleIsToggle = () => setIsToggle(!isToggle);

  return (
    <div>
      <Btn onClick={handleIsToggle}>{!text ? "옵션선택" : text}</Btn>
      <div className="relative w-full">
        <AnimatePresence>
          {isToggle && (
            <motion.div
              className="absolute top-full left-0 z-10 w-full bg-white p-2 text-black shadow-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {options.map((option, i) => (
                <p
                  onClick={() => {
                    setText(option);
                    handleIsToggle();
                  }}
                  key={i}
                >
                  {option}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DropdownBtn;
