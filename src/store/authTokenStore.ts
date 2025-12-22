import { UserRole } from "@/models/user.model";
import { create } from "zustand";

type AuthState = {
  token: null | string;
  isAuth: boolean;
  role: UserRole | "GUEST";
};

type AuthAction = {
  setToken: (payload: { token: string | null; role: UserRole }) => void;
  clearAuth: () => void;
};

const useAuthTokenStore = create<AuthState & AuthAction>((set) => ({
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

export default useAuthTokenStore;
