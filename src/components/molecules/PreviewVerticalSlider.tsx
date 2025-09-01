// import React, { useEffect, useRef, useState } from "react";
// import { motion, MotionValue, useTransform } from "framer-motion";
// import Img from "../atoms/Img";
// import Card from "../atoms/Card";

// const PreviewVerticalSlider = ({
//   isViewScratch,
// }: {
//   isViewScratch: "show" | "hidden";
// }) => {
//   // 가로 기준
//   const ref = useRef<HTMLDivElement>(null);
//   const [items, setItems] = useState([0, 1, 2]);

//   useEffect(() => {
//     if (!ref.current) return;
//     const bodyWidth = document.body.getBoundingClientRect().width;

//     const container = ref.current.querySelector(".marquee_section");
//     if (!container) return;

//     const containerWidth = container.getBoundingClientRect().width;

//     if (containerWidth < bodyWidth * 2) {
//     }
//   }, [items]);

//   return (
//     <motion.div
//       className="fixed top-0 right-0 w-1/5 min-w-fit overflow-hidden max-sm:top-1/2 max-sm:left-0 max-sm:w-full min-sm:hidden"
//       initial={{ opacity: 0, x: 100 }}
//       animate={{
//         opacity: isViewScratch === "show" ? 1 : 0,
//         x: isViewScratch === "show" ? 0 : 100,
//       }}
//       ref={ref}
//     >
//       <motion.ul
//         className="marquee_section flex flex-col flex-nowrap items-end gap-4 max-sm:flex-row"
//         style={{ x: "" }}
//       >
//         {Array.from({ length: 2 }).flatMap((_, cloneIndex) =>
//           items.map((itemIndex) => (
//             <motion.li
//               key={`${itemIndex}-${cloneIndex}`}
//               className="marquee_item h-[300px] w-[240px] shrink-0 grow-0 border-2 border-gray-300 shadow-md"
//             >
//               <Card className="h-full w-full">
//                 <div className="relative h-3/5 w-full">
//                   <Img src="/marriage.jpg" />
//                 </div>
//                 <ul className="p-2">
//                   <li className="text-lg font-semibold text-[#5B5A57]">
//                     title {itemIndex}
//                   </li>
//                   <li className="text-sm text-[#8E8E8A]">description</li>
//                 </ul>
//               </Card>
//             </motion.li>
//           )),
//         )}
//       </motion.ul>
//     </motion.div>
//   );
// };

// export default PreviewVerticalSlider;

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Img from "../atoms/Img";
import Card from "../atoms/Card";

const PreviewVerticalSlider = ({
  isViewScratch,
}: {
  isViewScratch: "show" | "hidden";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [items] = useState([0, 1, 2]);
  const x = useMotionValue(0);

  // 원본 + 복제
  const renderItems = Array.from({ length: 2 }).flatMap((_, cloneIndex) =>
    items.map((itemIndex) => ({
      id: `${itemIndex}-${cloneIndex}`,
      index: itemIndex,
    })),
  );

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current.querySelector(
      ".marquee_section",
    ) as HTMLUListElement;
    if (!container) return;

    // 컨테이너 전체 width(px)
    const containerWidth = container.getBoundingClientRect().width;

    // 원본 길이 = 전체 / 2
    const originalWidth = containerWidth / 2;

    // 무한 스크롤 애니메이션
    const controls = animate(x, -originalWidth, {
      duration: 10, // 속도 조절
      ease: "linear",
      repeat: Infinity,
    });

    return () => controls.stop();
  }, [x, items]);

  return (
    <motion.div
      className="fixed top-1/2 right-0 w-1/5 min-w-fit overflow-hidden max-sm:left-0 max-sm:w-full"
      initial={{ opacity: 0, x: 100 }}
      animate={{
        opacity: isViewScratch === "show" ? 1 : 0,
        x: isViewScratch === "show" ? 0 : 100,
      }}
      ref={ref}
    >
      <motion.ul
        className="marquee_section flex flex-row flex-nowrap gap-4"
        style={{ x }}
      >
        {renderItems.map((item) => (
          <motion.li
            key={item.id}
            className="marquee_item h-[300px] w-[240px] shrink-0 grow-0 border-2 border-gray-300 shadow-md"
          >
            <Card className="h-full w-full">
              <div className="relative h-3/5 w-full">
                <Img src="/marriage.jpg" />
              </div>
              <ul className="p-2">
                <li className="text-lg font-semibold text-[#5B5A57]">
                  title {item.index}
                </li>
                <li className="text-sm text-[#8E8E8A]">description</li>
              </ul>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default PreviewVerticalSlider;
