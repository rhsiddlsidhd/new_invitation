import mongoose, { Schema, Document, Types, Model } from "mongoose";

type OrderStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export interface OrderFeatureSnapshot {
  featureId: mongoose.Types.ObjectId; // Feature 참조 ID
  code: string;
  label: string;
  price: number; // 구매 당시 가격
}

interface CreateOrderDto {
  productId: Types.ObjectId;
  selectedFeatures?: OrderFeatureSnapshot[];
  // 구매자 정보 (로그인 세션에서 가져올 수도 있지만, 직접 입력받는 경우 포함)
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
}

export interface OrderBase extends CreateOrderDto {
  merchantUid: string; // 서버에서 생성하는 고유 주문 번호
  userId: Types.ObjectId;
  originalPrice: number;
  finalPrice: number;
  discountRate?: number;
  discountAmount?: number;
}

export interface Order extends OrderBase, Document {
  orderStatus: OrderStatus;
  paymentId?: Types.ObjectId;
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
  (mongoose.models.Order as Model<Order>) ||
  mongoose.model<Order>("Order", orderSchema);
