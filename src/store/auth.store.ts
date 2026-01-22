import { UserRole } from "@/models/user.model";
import { create } from "zustand";

type AuthState = {
  token: null | string;
  isAuth: boolean;
  role: UserRole | "GUEST";
};

type AuthAction = {
  setToken: (payload: { token: string; role: UserRole }) => void;
  clearAuth: () => void;
};

const useAuthStore = create<AuthState & AuthAction>((set) => ({
  token: null,
  isAuth: false,
  role: "GUEST",
  setToken: ({ token, role }) =>
    set(() => ({
      token,
      isAuth: !!token,
      role: token ? role : "GUEST",
    })),
  clearAuth: () =>
    set(() => ({
      token: null,
      isAuth: false,
      role: "GUEST",
    })),
}));

export default useAuthStore;
