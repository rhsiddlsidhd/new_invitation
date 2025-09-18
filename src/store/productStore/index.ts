import { create } from "zustand";

const initialState: Omit<
  ProductStore,
  "setFont" | "setBackgroundColor" | "setClearProduct"
> = {
  font: "",
  backgroundColor: "",
};

const useProductStore = create<ProductStore>((set) => ({
  ...initialState,
  setFont: (font: string) =>
    set((state) => ({ ...state, font: state.font === font ? "" : font })),
  setBackgroundColor: (color: string) =>
    set((state) => ({ ...state, backgroundColor: color })),
  setClearProduct: () => set({ ...initialState }),
}));

export const useSetProductFont = () =>
  useProductStore((state: ProductStore) => state.setFont);

export const useSetClearProduct = () =>
  useProductStore((state: ProductStore) => state.setClearProduct);

export const useGetProductfont = () =>
  useProductStore((state: ProductStore) => state.font);

export const useGetProductColor = () =>
  useProductStore((state: ProductStore) => state.backgroundColor);
