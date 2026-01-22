import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CheckoutProductData } from "@/types/checkout";

interface OrderState {
  order: CheckoutProductData | null;
  setOrder: (orderData: CheckoutProductData) => void;
  clearOrder: () => void;
}

export const useOrderStore = create(
  persist<OrderState>(
    (set) => ({
      order: null,
      setOrder: (orderData) => set({ order: orderData }),
      clearOrder: () => set({ order: null }),
    }),
    {
      name: "order-storage", // key in sessionStorage
      storage: createJSONStorage(() => sessionStorage), // specify sessionStorage
    },
  ),
);
