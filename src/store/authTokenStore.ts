import { create } from "zustand";

type AuthState = {
  token: null | string;
  isAuth: boolean;
};

type AuthAction = {
  setToken: (token: string | null) => void;
};

const useAuthTokenStore = create<AuthState & AuthAction>((set) => ({
  token: null,
  isAuth: false,
  setToken: (token) => set(() => ({ token, isAuth: !!token })),
}));

export default useAuthTokenStore;
