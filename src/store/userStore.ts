import { IGallery } from "@/models/invitationSchema";
import { create } from "zustand";

interface UserStore {
  userId: string;
  groomName: string;
  groomPhone: string;
  groomAccount: string;
  brideName: string;
  bridePhone: string;
  brideAccount: string;
  weddingDate: string;
  weddingAddress: string;
  weddingDetailAddress: string;
  groomFatherName: string;
  groomFatherPhone: string;
  groomFatherAccount: string;
  groomMotherName: string;
  groomMotherPhone: string;
  groomMotherAccount: string;
  brideFatherName: string;
  brideFatherPhone: string;
  brideFatherAccount: string;
  brideMotherName: string;
  brideMotherPhone: string;
  brideMotherAccount: string;
  thumbnails: string[];
  // galleries: GalleryData[];
  galleries: IGallery[];
  setUser: (user: Partial<UserStore>) => void;
  clearUser: () => void;
  // errors: Record<string, string[] | undefined>;
  errors: Partial<Record<string, string[]>>;
  // setErrors: (errors: Record<string, string[] | undefined>) => void;
  setErrors: (errors: Partial<Record<string, string[]>>) => void;
  clearErrors: () => void;
  isUser: boolean;
}

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
  // setErrors: (errors) => set(() => ({ errors })),
  setErrors: (errors) =>
    set((state) => ({
      errors: { ...state.errors, ...errors },
    })),
}));
