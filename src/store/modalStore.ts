import { create } from "zustand";

import { menus } from "@/contants";

export interface ModalConfig {
  backgroundColor: "white" | "transparent";
}

export type ModalType =
  | "login"
  | "register"
  | "wedding-party-info"
  | "wedding-date-info"
  | "wedding-parent-info"
  | "wedding-thumbnail"
  | "wedding-gallery"
  | "wedding-contact"
  | null;

interface ModalState {
  isOpen: boolean;
  setModalOpen: (args: {
    isOpen: boolean;
    type?: ModalType;
    path?: (typeof menus)[number]["path"] | null;
    config?: ModalConfig;
  }) => void;
  errors: Record<string, string[] | undefined>;
  setErrors: (errors: Record<string, string[] | undefined>) => void;
  modalType: ModalType;
  nextPath: (typeof menus)[number]["path"] | null;
  config?: ModalConfig;
}

const initialState: Omit<ModalState, "setModalOpen" | "setErrors"> = {
  isOpen: false,
  errors: {},
  modalType: null,
  nextPath: null,
  config: {
    backgroundColor: "white",
  },
};

export const useModalStore = create<ModalState>((set) => ({
  ...initialState,
  setModalOpen: ({ isOpen, type = null, path = null, config }) =>
    set({
      isOpen: isOpen,
      modalType: type,
      nextPath: path,
      config: config ?? { backgroundColor: "white" },
    }),
  setErrors: (errors) => set({ errors }),
}));
