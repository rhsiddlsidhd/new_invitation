import { AnimatePresence } from "motion/react";
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { menus } from "@/shared/constants";
import { useModalStore } from "@/shared/store/modalStore";
import { useAuthStore } from "@/domains/auth";
import { navigationContainer, navigationItem } from "@/styles/variants";

const NavigationMenu = ({
  textView,
}: {
  textView: "pending" | "show" | "hidden";
}) => {
  const { setModalOpen } = useModalStore();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleMenuClick = useCallback(
    (menu: (typeof menus)[number], isAuth: boolean) => {
      if (menu.id !== "Products" && !isAuth) {
        setModalOpen({ isOpen: true, type: "login", path: menu.path });
        return;
      }
      router.push(menu.path);
    },
    [router, setModalOpen],
  );

  return (
    <AnimatePresence>
      {textView !== "hidden" && (
        <motion.ul
          variants={navigationContainer}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed top-2/4 right-0 -translate-y-1/2 text-[5vw] font-bold text-white`}
        >
          {menus.map((menu) => {
            return (
              <motion.li
                key={menu.id}
                className="z-50 cursor-pointer"
                variants={navigationItem}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.85 }}
                custom={{ textView }}
                onClick={() =>
                  textView === "show" && handleMenuClick(menu, isAuthenticated)
                }
              >
                {menu.id}
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default NavigationMenu;
