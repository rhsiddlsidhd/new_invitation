"use client";

import {
  GuestbookModalType,
  useGuestbookModalStore,
} from "@/store/guestbook.modal.store";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";

import CreateGuestbookForm from "../forms/CreateGuestbookForm";
import DeleteGuestbookForm from "../forms/DeleteGuestbookForm";
import { Dialog, DialogContent } from "@/components/atoms/Dialog/Dialog";

const GUESTBOOK: Record<
  GuestbookModalType,
  React.ComponentType<{ payload: unknown }>
> = {
  WRITE_GUESTBOOK: CreateGuestbookForm,
  DELETE_GUESTBOOK: DeleteGuestbookForm,
};

const GuestBookModal = () => {
  const { isOpen, type, payload, closeModal, clearIsOpen } =
    useGuestbookModalStore();
  const [dialogOpen, setDialogOpen] = useState(true);

  const Component = useMemo(() => {
    return type ? GUESTBOOK[type] : null;
  }, [type]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setDialogOpen(true);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setDialogOpen(false);
      setTimeout(() => {
        closeModal();
      }, 200);
    }
  };

  const handleBackdropClick = () => {
    setDialogOpen(false);
    setTimeout(() => {
      closeModal();
    }, 200);
  };

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
              handleBackdropClick();
            }
          }}
        >
          <Dialog
            modal={false}
            open={dialogOpen}
            onOpenChange={handleDialogClose}
          >
            <DialogContent className="sm:max-w-106.25">
              <Component payload={payload} />
            </DialogContent>
          </Dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuestBookModal;
