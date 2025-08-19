import { menus } from "@/contants";
import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (value: boolean | null) => void;
  userId: string;
  setUserId: (id: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
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
  isAuthenticated: null,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  userId: "",
  setUserId: (id) => set({ userId: id }),
  userEmail: "",
  setUserEmail: (email) => set({ userEmail: email }),
  isPasswordVerified: false,
  setIsPasswordVerified: (value) => set({ isPasswordVerified: value }),
  // Modal 관련 상태 초기값
  // isModalOpen: false,
  // modalType: null,
  // nextPath: null,
  // setModalOpen: (isOpen, type = null, path = null) =>
  // set({ isModalOpen: isOpen, modalType: type, nextPath: path }),
}));

export default useAuthStore;
