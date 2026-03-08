import { UserRole } from "@/models/user.model";
import { AuthSession } from "@/types/auth";
import { create } from "zustand";

export type AuthState = {
  token: string | null;
  isAuth: boolean;
  role: UserRole | "GUEST";
  userId: string | null;
};

type AuthAction = {
  setToken: (session: AuthSession) => void;
  clearAuth: () => void;
};

const useAuthStore = create<AuthState & AuthAction>((set) => ({
  token: null,
  isAuth: false,
  role: "GUEST",
  userId: null,
  setToken: ({ token, role, userId }) =>
    set(() => ({
      token,
      isAuth: !!token,
      role: token ? role : "GUEST",
      userId,
    })),
  clearAuth: () =>
    set(() => ({
      token: null,
      isAuth: false,
      role: "GUEST",
      userId: null,
    })),
}));

export default useAuthStore;
