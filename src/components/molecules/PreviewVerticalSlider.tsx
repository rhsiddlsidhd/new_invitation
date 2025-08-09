import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import Img from "../atoms/Img";
import Card from "../atoms/Card";
// relative w-[240px] overflow-hidden  p-2 max-sm:hidden max-sm:w-full
const PreviewVerticalSlider = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(0);

  const CARDHEIGHT = 300;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, CARDHEIGHT * 2 - scrollY],
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const height = containerRef.current.scrollHeight;
    setScrollY(height);
  }, []);

  return (
    <div className="sticky top-0 h-screen w-[240px] p-2 max-sm:hidden max-sm:w-full">
      <motion.div ref={containerRef} className="" style={{ y }}>
        {Array.from({ length: 6 }, (_, i) => {
          return (
            <div key={i} className="h-[300px] w-full">
              <Card className="h-full w-full">
                <div className="relative h-3/5 w-full">
                  <Img src="/marriage.jpg" />
                </div>
                <ul className="p-2">
                  <li className="text-lg font-semibold text-[#5B5A57]">
                    title
                  </li>
                  <li className="text-sm text-[#8E8E8A]">description</li>
                </ul>
              </Card>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default PreviewVerticalSlider;
