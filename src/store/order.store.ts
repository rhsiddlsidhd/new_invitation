import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CheckoutProductData } from "@/types/checkout";

interface OrderState {
  order: CheckoutProductData | null;
  setOrder: (orderData: CheckoutProductData) => void;
  clearOrder: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

// 1. create<OrderState>() 위치에 제네릭 명시
export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      order: null,
      setOrder: (orderData) => set({ order: orderData }),
      clearOrder: () => set({ order: null }),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ order: state.order }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
