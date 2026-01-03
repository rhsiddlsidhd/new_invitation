// src/types/checkout.d.ts

// export interface SelectedOption {
//   _id: string; // Feature ID
//   code: string;
//   label: string;
//   price: number;
// }

export type SelectedOption = Omit<OrderFeatureSnapshot, "featureId"> & {
  featureId: string;
};

export interface CheckoutProductData {
  _id: string; // Product ID
  title: string;
  originalPrice: number; // Base price of the product
  thumbnail: string; // Thumbnail image URL
  selectedOptionPrice: number; // Sum of prices of all selected options
  selectedOptions: SelectedOption[]; // Details of selected options
  quantity: number; // Quantity selected by user
  totalPrice: number; // calculated total price for this item = (originalPrice + selectedOptionPrice) * quantity
}
