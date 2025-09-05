import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;

  isPasswordVerified: boolean;
  setIsPasswordVerified: (value: boolean) => void;
  // Modal 관련 상태
  // isModalOpen: boolean;
  // modalType: ModalType;
  // nextPath: (typeof menus)[number]["path"] | null;
  // setModalOpen: (
  //   isOpen: boolean,
  //   type?: ModalType,
  //   nextPath?: (typeof menus)[number]["path"] | null,
  // ) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  isPasswordVerified: false,
  setIsPasswordVerified: (value) => set({ isPasswordVerified: value }),
}));

export default useAuthStore;
