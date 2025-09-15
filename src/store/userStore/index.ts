import { create } from "zustand";
import { UserStore } from "./type";

const initialState: Omit<
  UserStore,
  "setUser" | "clearUser" | "errors" | "setErrors" | "clearErrors" | "isUser"
> = {
  userId: "",
  groomName: "",
  groomPhone: "",
  groomAccount: "",
  brideName: "",
  bridePhone: "",
  brideAccount: "",
  weddingDate: "",
  weddingAddress: "",
  weddingDetailAddress: "",
  groomFatherName: "",
  groomFatherPhone: "",
  groomFatherAccount: "",
  groomMotherName: "",
  groomMotherPhone: "",
  groomMotherAccount: "",
  brideFatherName: "",
  brideFatherPhone: "",
  brideFatherAccount: "",
  brideMotherName: "",
  brideMotherPhone: "",
  brideMotherAccount: "",
  thumbnails: ["", ""],
  galleries: [],
};

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,
  errors: {},
  isUser: false,
  setUser: (user) => set((state) => ({ ...state, ...user })),
  clearUser: () => set(() => ({ ...initialState })),
  clearErrors: () => set(() => ({ errors: {} })),
  setErrors: (errors) =>
    set((state) => ({
      errors: { ...state.errors, ...errors },
    })),
}));

export const useClearUser = () =>
  useUserStore((state: UserStore) => state.clearUser);
export const useSetUser = () =>
  useUserStore((state: UserStore) => state.setUser);
export const useSetUserErrors = () =>
  useUserStore((state: UserStore) => state.setErrors);
export const useClearUserErrors = () =>
  useUserStore((state: UserStore) => state.clearErrors);
export const getUserState = () => useUserStore.getState();
