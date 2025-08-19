import { create } from "zustand";

import { menus } from "@/contants";

export type ModalType =
  | "login"
  | "register"
  | "wedding-party-info"
  | "wedding-date-info"
  | "wedding-parent-info"
  | "wedding-thumbnail"
  | "wedding-gallery"
  | null;

interface ModalState {
  isOpen: boolean;
  setModalOpen: (
    isOpen: boolean,
    type?: ModalType,
    nextPath?: (typeof menus)[number]["path"] | null,
  ) => void;
  errors: Record<string, string[] | undefined>;
  setErrors: (errors: Record<string, string[] | undefined>) => void;
  modalType: ModalType;
  nextPath: (typeof menus)[number]["path"] | null;
}

const initialState: Omit<ModalState, "setModalOpen" | "setErrors"> = {
  isOpen: false,
  errors: {},
  modalType: null,
  nextPath: null,
};

export const useModalStore = create<ModalState>((set) => ({
  ...initialState,
  setModalOpen: (isOpen, type = null, path = null) =>
    set({ isOpen: isOpen, modalType: type, nextPath: path }),
  setErrors: (errors) => set({ errors }),
}));
