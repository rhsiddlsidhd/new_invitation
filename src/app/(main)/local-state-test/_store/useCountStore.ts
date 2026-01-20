import { create } from "zustand";

interface CountState {
  count: number;
  increment: () => void;
}

const useCountStore = create<CountState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export default useCountStore;
