import { create } from "zustand";

import { menus } from "@/constant";

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
  | "guest-book-view"
  | "guest-book-write"
  | null;

interface ModalState {
  isOpen: boolean;
  setModalOpen: (args: {
    isOpen: boolean;
    type?: ModalType;
    path?: (typeof menus)[number]["path"] | null;
    config?: ModalConfig;
    payload?: unknown;
  }) => void;

  errors: Record<string, string[] | undefined>;
  setErrors: (errors: Record<string, string[] | undefined>) => void;
  modalType: ModalType;
  nextPath: (typeof menus)[number]["path"] | null;
  config?: ModalConfig;
  payload?: unknown;
}

const initialState: Omit<ModalState, "setModalOpen" | "setErrors"> = {
  isOpen: false,
  errors: {},
  modalType: null,
  nextPath: null,
  config: {
    backgroundColor: "white",
  },
  payload: null,
};

export const useModalStore = create<ModalState>((set) => ({
  ...initialState,
  setModalOpen: ({ isOpen, type, path, config, payload }) =>
    set({
      isOpen: isOpen,
      modalType: type ?? null,
      nextPath: path ?? null,
      config: config ?? { backgroundColor: "white" },
      payload: payload ?? null,
    }),
  setErrors: (errors) => set({ errors }),
}));
