import mongoose, { Schema, Document, Types } from "mongoose";

export interface OrderFeatureSnapshot {
  featureId: string; // Feature 참조 ID
  code: string;
  label: string;
  price: number; // 구매 당시 가격
}

export interface Order extends Document {
  userId: Types.ObjectId; // 구매자 ID
  productId: Types.ObjectId;
  originalPrice: number; // 상품 기본 정가
  finalPrice: number; // 최종 결제 금액
  discountRate?: number;
  discountAmount?: number;
  selectedFeatures?: OrderFeatureSnapshot[]; // 선택한 유료 옵션
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    originalPrice: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    discountRate: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    selectedFeatures: [
      {
        featureId: {
          type: Schema.Types.ObjectId,
          ref: "Feature",
          required: true,
        },
        code: { type: String, required: true },
        label: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const OrderModel =
  mongoose.models.Order || mongoose.model<Order>("Order", orderSchema);
