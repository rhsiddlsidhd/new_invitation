"use client";
import React, { useRef } from "react";
import Logo from "../atoms/Logo";
import Card from "../atoms/Card";
import Img from "../atoms/Img";
import { motion } from "framer-motion";
import { useModalStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";

// const TemplateGallery = ({ scroll }: { scroll: MotionValue<number> }) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const listContainerRef = useRef<HTMLDivElement>(null);
//   const [elementHeights, setElementHeights] = useState<
//     Record<"container" | "card", number>
//   >({ container: 0, card: 0 });

//   const gap = 16;
//   const twoRowsVisibleHeight = elementHeights.card * 2 + gap * 3;
//   const moveDistance = elementHeights.container - twoRowsVisibleHeight;

//   const y = useTransform(
//     scroll,
//     [0, 1],
//     [elementHeights.container, -moveDistance],
//   );

//   const opacity = useTransform(scroll, [0, 0.5, 1], [0, 1, 1]);

//   // pointerEvents를 동적으로 관리할 state
//   const [pointerEvents, setPointerEvents] = useState<"auto" | "none">("none");

//   useMotionValueEvent(opacity, "change", (latest) => {
//     setPointerEvents(latest > 0.95 ? "auto" : "none");
//   });

//   const smoothY = useSpring(y, {
//     stiffness: 100,
//     damping: 30,
//     mass: 0.8,
//   });

//   useEffect(() => {
//     if (!listContainerRef.current || !cardRef.current) return;

//     const updateHeight = () => {
//       if (!listContainerRef.current || !cardRef.current) return;
//       const container = listContainerRef.current.offsetHeight;
//       const card = cardRef.current.offsetHeight;
//       setElementHeights({ container, card });
//     };

//     updateHeight();

//     const resizeObserver = new ResizeObserver(() => {
//       updateHeight();
//     });

//     resizeObserver.observe(listContainerRef.current);
//     resizeObserver.observe(cardRef.current);

//     return () => {
//       resizeObserver.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     console.log("pointerEvents", pointerEvents);
//   }, [pointerEvents]);

//   return (
//     <motion.div
//       style={{
//         y: smoothY,
//         opacity,
//         pointerEvents,
//       }}
//       className="fixed top-0 left-1/2 z-10 w-11/12 -translate-x-1/2 bg-white"
//       ref={listContainerRef}
//     >
//       <div className="pt-4 sm:pt-8">
//         <div className="w-full">
//           <Logo className="m-auto block" />
//         </div>
//         <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
//           {Array.from({ length: 8 }, (_, i) => (
//             <Card
//               key={i}
//               className="aspect-[5/8] max-h-[45vh] w-full cursor-pointer"
//               ref={cardRef}
//               onClick={() => console.log("card")}
//             >
//               <div className="relative h-3/4 w-full">
//                 <Img src="/marriage.jpg" />
//               </div>
//               <div className="p-3">
//                 <h3 className="text-lg font-semibold">템플릿 {i + 1}</h3>
//                 <p className="mt-1 text-sm text-gray-600">클래식 스타일</p>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default TemplateGallery;

const TemplateGallery = ({ user }: { user: string | null }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const { setModalOpen } = useModalStore();
  const router = useRouter();

  const cardList = [
    {
      id: "blue",
      thumnail: "/wedding-1430.jpg",
      title: "블루 스타일",
      des: "산뜻한 블루",
    },
    {
      id: "pink",
      thumnail: "/wedding-1850.jpg",
      title: "핑크 스타일",
      des: "러블리 핑크",
    },
  ];

  const handleNavigation = (query: string) => {
    if (!user) {
      setModalOpen({ isOpen: true, type: "login" });
      return;
    }
    router.push(`/detail/${user}?t=${query}`);
  };

  return (
    <motion.div
      className="relative top-0 left-1/2 z-10 w-11/12 -translate-x-1/2 bg-white"
      ref={listContainerRef}
    >
      <div className="pt-4 sm:pt-8">
        <div className="w-full">
          <Logo className="m-auto block" />
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {cardList.map((card, i) => {
            return (
              <Card
                key={i}
                className="aspect-[5/8] max-h-[45vh] w-full cursor-pointer"
                ref={cardRef}
                onClick={() => handleNavigation(card.id)}
              >
                <div className="relative h-3/4 w-full">
                  <Img src={card.thumnail} />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{card.des}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateGallery;
