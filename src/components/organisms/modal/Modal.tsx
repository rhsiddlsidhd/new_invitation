"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SignInForm from "../forms/SignInForm";
import RegisterForm from "../forms/RegisterForm";
import WeddingPartyInfoForm from "../forms/WeddingPartyInfoForm";
import { ModalType, useModalStore } from "@/shared/store";
import WeddingDateForm from "../forms/WeddingDateForm";
import WeddingParentForm from "../forms/WeddingParentForm";
import WeddingThumbnailForm from "../forms/WeddingThumbnailForm";
import WeddingGalleryForm from "../forms/WeddingGalleryForm";
import Overlay from "../../atoms/Overlay/Overlay";
import Contact from "../panel/Contact";

import GuestBook from "@/components/organisms/(preview)/GuestbookView";
import GuestBookForm from "../(preview)/GuestbookForm";
import { useClearUserErrors } from "@/__domains/user";

const Modal = () => {
  const { isOpen, modalType, config, setModalOpen } = useModalStore();
  const clearErrors = useClearUserErrors();
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
      case "wedding-contact":
        return <Contact />;
      case "guest-book-view":
        return <GuestBook />;
      case "guest-book-write":
        return <GuestBookForm />;
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
        setModalOpen({ isOpen: false });
        clearErrors();
      }
    });
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, setModalOpen, clearErrors]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay key={modalType} isOpen={isOpen}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`scrollbar-hide relative max-h-[80vh] w-full max-w-md origin-top-left overflow-y-scroll rounded-lg ${config && config.backgroundColor === "white" ? "bg-white" : "bg-transparent"} p-6`}
            ref={modalref}
          >
            {createModalContent(modalType)}
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
