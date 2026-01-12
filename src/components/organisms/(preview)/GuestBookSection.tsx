"use client";

import {
  GuestbookModalType,
  useGuestbookModalStore,
} from "@/store/guestbook.modal.store";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo } from "react";

import GuestbookView from "./GuestbookView";
import GuestbookForm from "./GuestbookForm";
import clsx from "clsx";

const GUESTBOOK: Record<
  GuestbookModalType,
  React.ComponentType<{ payload: unknown }>
> = {
  VIEW_GUESTBOOK: GuestbookView,
  WRITE_GUESTBOOK: GuestbookForm,
};

const GuestBookSection = () => {
  const { isOpen, type, payload, closeModal, clearIsOpen } =
    useGuestbookModalStore();

  const modalref = React.useRef<HTMLDivElement>(null);

  const Component = useMemo(() => {
    return type ? GUESTBOOK[type] : null;
  }, [type]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!Component) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (!isOpen) clearIsOpen();
          }}
          className={`fixed inset-0 z-50 flex transform-gpu items-center justify-center bg-black/60 p-4 backdrop-blur-sm`}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={clsx(
              `scrollbar-hide relative max-h-[80vh] w-full max-w-md overflow-y-scroll rounded-lg p-6`,
              type === "WRITE_GUESTBOOK"
                ? "bg-white/95 shadow-xl"
                : "bg-transparent",
            )}
            ref={modalref}
          >
            <Component payload={payload} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuestBookSection;
