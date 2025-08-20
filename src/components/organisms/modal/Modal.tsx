"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SignInForm from "../forms/SignInForm";
import RegisterForm from "../forms/RegisterForm";

import WeddingPartyInfoForm from "../forms/WeddingPartyInfoForm";
import { ModalType, useModalStore } from "@/store/modalStore";
import WeddingDateForm from "../forms/WeddingDateForm";
import WeddingParentForm from "../forms/WeddingParentForm";
import WeddingThumbnailForm from "../forms/WeddingThumbnailForm";
import WeddingGalleryForm from "../forms/WeddingGalleryForm";

const Modal = () => {
  const { isOpen, modalType, setModalOpen } = useModalStore();
  const modalref = React.useRef<HTMLDivElement>(null);

  const createModalContent = (modalType: ModalType) => {
    switch (modalType) {
      case "login":
        return <SignInForm />;
      case "register":
        return <RegisterForm />;
      case "wedding-party-info":
        return <WeddingPartyInfoForm />;
      case "wedding-date-info":
        return <WeddingDateForm />;
      case "wedding-parent-info":
        return <WeddingParentForm />;
      case "wedding-thumbnail":
        return <WeddingThumbnailForm />;
      case "wedding-gallery":
        return <WeddingGalleryForm />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("mousedown", (event) => {
      if (
        modalref.current &&
        !modalref.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    });
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, setModalOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={modalType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 flex items-center justify-center bg-black/50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"} z-50`}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="scrollbar-hide relative max-h-[80vh] w-full max-w-md origin-top-left overflow-y-scroll rounded-lg bg-white p-6"
            ref={modalref}
          >
            {createModalContent(modalType)}
            {/* <button
              onClick={() => setModalOpen(false)}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 px-2 py-2 hover:bg-red-400"
            >
              <CloseIcon />
            </button> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
