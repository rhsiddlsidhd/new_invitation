import { AnimatePresence } from "motion/react";
import React from "react";
import { motion, MotionValue, stagger } from "framer-motion";
import { useRouter } from "next/navigation";
import { menus } from "@/contants";
import { useModalStore } from "@/store/modalStore";

const ScrollNavigationMenu = ({
  textView,
  y,
  user,
}: {
  textView: "pending" | "show" | "hidden";
  y: MotionValue<string>;
  user: string | null;
}) => {
  const { setModalOpen } = useModalStore();
  const router = useRouter();

  const handleMenuClick = (
    menu: (typeof menus)[number],
    user: string | null,
  ) => {
    if (menu.id !== "Contact" && !user) {
      setModalOpen(true, "login", menu.path);
      return;
    }
    router.push(menu.path);
  };

  const menuVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
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

  const item = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      x: 20,
    },
    visible: ({ textView }: { textView: "hide" | "show" | "pending" }) => {
      switch (textView) {
        case "show":
          return {
            opacity: 1,
            scale: 0.8,
            x: 0,
            transition: { duration: 0.3 },
          };
        case "pending":
          return {
            opacity: 1,
            scale: 0.9,
            x: 0,
            filter: "brightness(0.8)",
            transition: { duration: 0.3 },
            pointerEvents: "none",
          };
        default:
          return {};
      }
    },

    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.1 },
    },
  };

  return (
    <AnimatePresence>
      {textView !== "hidden" && (
        <motion.ul
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed top-2/4 right-0 -translate-y-1/2 text-[5vw] font-bold text-white`}
          style={{
            y,
          }}
        >
          {menus.map((m) => {
            return (
              <motion.li
                key={m.id}
                className="z-50 cursor-pointer"
                variants={item}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.7 }}
                custom={{ textView }}
                onClick={() => textView === "show" && handleMenuClick(m, user)}
              >
                {m.id}
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default ScrollNavigationMenu;
