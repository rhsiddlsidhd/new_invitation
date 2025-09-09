// import { create } from "zustand";

// interface ProfileStore {
//   userId: string;
//   email: string;
//   setProfile: (profile: Partial<ProfileStore>) => void;
//   clearProfile: () => void;
// }

// const initialState: Omit<ProfileStore, "setProfile" | "clearProfile"> = {
//   userId: "",
//   email: "",
// };

// const useProfileStore = create<ProfileStore>((set) => ({
//   ...initialState,
//   setProfile: (profile) => set(() => ({ ...initialState, ...profile })),
//   clearProfile: () => set({ ...initialState }),
// }));

// export default useProfileStore;
