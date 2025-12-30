import { FULL_RATE, SLAE_PERCENT } from "@/contants/price";

export const formatPriceWithComma = (value: number): string => {
  return value.toLocaleString();
};

export const basePriceAfterDiscount = (price: number): number => {
  return price * (FULL_RATE - SLAE_PERCENT);
};
