import mongoose, { model, Schema, Model } from "mongoose";

export type Status = "active" | "inactive" | "soldOut";
export type Mood = "modern" | "romantic" | "vintage" | "classic" | "minimal";
export type ProductCategory = "wedding" | "thank-you" | "first-birthday";

// 할인 정보를 위한 서브 스키마 정의 (더 안전한 검증을 위해)
const discountSchema = new Schema({
  discountType: { 
    type: String, 
    enum: ["rate", "amount"], 
    default: "rate" 
  },
  value: {
    type: Number,
    default: 0,
  }
}, { _id: false });

export interface ProductDB {
  authorId: string;
  title: string;
  description: string;
  thumbnail: string;
  previewUrl?: string;
  price: number;
  category: ProductCategory;
  mood: Mood;
  isPremium: boolean;
  options?: mongoose.Types.ObjectId[];
  feature: boolean;
  priority: number;
  likes: mongoose.Types.ObjectId[];
  isLiked: boolean;
  views: number;
  salesCount: number;
  discount: {
    discountType: "rate" | "amount";
    value: number;
  };
  status: Status;
  deletedAt?: Date;
}

export interface ProductDocument extends ProductDB, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductJSON extends Omit<
  ProductDB,
  "likes" | "options" | "deletedAt"
> {
  _id: string;
  likes: string[];
  options: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

const productSchema = new Schema<ProductDocument>(
  {
    authorId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    previewUrl: { type: String },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["wedding", "thank-you", "first-birthday"],
      required: true,
    },
    mood: {
      type: String,
      enum: ["modern", "romantic", "vintage", "classic", "minimal"],
      required: true,
    },
    feature: { type: Boolean, default: false },
    priority: { type: Number, default: 0 },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    isLiked: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
    discount: {
      type: discountSchema,
      default: () => ({ discountType: "rate", value: 0 })
    },
    isPremium: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "soldOut"],
      default: "active",
    },
    options: {
      type: [{ type: Schema.Types.ObjectId, ref: "Feature" }],
      default: [],
    },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

// 모델 컴파일 전 기존 모델 삭제 (개발 환경에서의 캐싱 에러 방지)
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

export const ProductModel = model<ProductDocument>("Product", productSchema);
