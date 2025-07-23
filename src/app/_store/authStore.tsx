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
}));

export default useAuthStore;
