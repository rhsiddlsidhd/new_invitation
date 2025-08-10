import React, { useEffect, useRef, useState } from "react";
import Logo from "../atoms/Logo";
import Card from "../atoms/Card";
import Img from "../atoms/Img";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";

const TemplateGallery = ({ scroll }: { scroll: MotionValue<number> }) => {
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [listContainerHeight, setListContainerHeight] = useState<number>(0);
  const y = useTransform(
    scroll,
    [0, 1],
    [listContainerHeight, -(listContainerHeight - 800)],
  );

  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

  useEffect(() => {
    if (!listContainerRef.current) return;

    const updateHeight = () => {
      if (!listContainerRef.current) return;
      const h = listContainerRef.current.offsetHeight;
      console.log("Container height:", h);
      setListContainerHeight(h);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(listContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <motion.div
      style={{ y: smoothY }}
      className="fixed top-0 left-1/2 z-10 h-fit w-11/12 -translate-x-1/2 border-2 border-white bg-white"
      ref={listContainerRef}
    >
      <div className="pt-4 sm:pt-8">
        <div className="h-fit w-full">
          <Logo className="m-auto block" />
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 max-sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <Card key={i} className="h-[400px]">
              <div className="relative h-3/4 w-full">
                <Img src="/marriage.jpg" />
              </div>
              <div className="p-3">
                <h3 className="text-lg font-semibold">템플릿 {i + 1}</h3>
                <p className="mt-1 text-sm text-gray-600">클래식 스타일</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateGallery;
