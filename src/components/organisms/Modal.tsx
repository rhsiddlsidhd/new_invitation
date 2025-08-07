"use client";
import useAuthStore from "@/store/authStore";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "../atoms/Icon";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";

const Modal = () => {
  const { isModalOpen, modalType, setModalOpen } = useAuthStore();
  const modalref = React.useRef<HTMLDivElement>(null);

  const createModalContent = (modalType: "login" | "register" | null) => {
    switch (modalType) {
      case "login":
        return <SignInForm />;
      case "register":
        return <RegisterForm />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;
    document.addEventListener("mousedown", (event) => {
      if (
        modalref.current &&
        !modalref.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    });
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, setModalOpen]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 flex items-center justify-center bg-black/50 ${isModalOpen ? "pointer-events-auto" : "pointer-events-none"} z-10`}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-md origin-top-left rounded-lg bg-white p-6"
            ref={modalref}
          >
            {createModalContent(modalType)}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 px-2 py-2 hover:bg-red-400"
            >
              <CloseIcon />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
