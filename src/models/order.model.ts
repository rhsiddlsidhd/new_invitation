import mongoose, { Schema, Document, Types } from "mongoose";

type OrderStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export interface OrderFeatureSnapshot {
  featureId: string; // Feature 참조 ID
  code: string;
  label: string;
  price: number; // 구매 당시 가격
}

export interface Order extends Document {
  // 식별자
  merchantUid: string;

  // 구매자
  userId: Types.ObjectId; // 구매자 ID
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;

  // 상품정보

  productId: mongoose.Types.ObjectId;
  selectedFeatures?: OrderFeatureSnapshot[];

  // 금액정보
  originalPrice: number; // 상품 기본 정가
  finalPrice: number; // 최종 결제 금액
  discountRate?: number;
  discountAmount?: number;

  // 주문 상태
  orderStatus: OrderStatus;

  // 결제 참조
  paymentId?: mongoose.Types.ObjectId; // 결제 ID

  // 이력
  cancelledAt?: Date;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<Order>(
  {
    // 식별자
    merchantUid: { type: String, required: true, unique: true },

    // 구매자
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    buyerPhone: { type: String, required: true },

    // 상품정보
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    selectedFeatures: [
      {
        _id: false,
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

    // 금액정보
    originalPrice: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    discountRate: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },

    // 주문 상태
    orderStatus: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
      required: true,
      default: "PENDING",
    },

    // 결제 참조
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },

    // 이력
    cancelledAt: { type: Date },
    cancelReason: { type: String },
  },
  { timestamps: true },
);

export const OrderModel =
  mongoose.models.Order || mongoose.model<Order>("Order", orderSchema);
