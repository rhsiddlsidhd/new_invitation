// src/types/checkout.d.ts

import { SelectFeatureDto } from "@/schemas/order.schema";

export interface CheckoutProductData {
  _id: string; // Product ID
  title: string;
  // 원가
  originalPrice: number;
  //할인가
  discountedPrice: number;
  // 옵션을 포함한 최종 가격
  productTotalPrice: number; // 최종 가격
  discount: { type: string; value: number };
  thumbnail: string;
  selectedFeatures: SelectFeatureDto[]; // 선택된 기능들
  // selectedFeaturesPrice: number;
  quantity: number; // 상품 가격
}
