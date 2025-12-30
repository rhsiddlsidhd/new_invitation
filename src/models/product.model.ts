import mongoose, { model, Schema, Document } from "mongoose";

export type Status = "active" | "inactive" | "soldOut";

export interface ProductDB {
  authorId: string;
  title: string;
  description: string;
  thumbnail: string;
  previewUrl?: string;
  price: number;
  category: "modern" | "romantic" | "vintage" | "classic" | "minimal";
  isPremium: boolean;
  options?: mongoose.Types.ObjectId[];
  feature: boolean;
  priority: number;
  // 👇 DB에서는 실제 배열
  likes: mongoose.Types.ObjectId[];
  isLiked: boolean;
  views: number;
  salesCount: number;
  discount: {
    type: string;
    value: number;
  };
  status: Status;
  deletedAt?: Date;
}

export interface ProductDocument extends ProductDB, Document {
  createdAt: Date;
  updatedAt: Date;
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
      enum: ["modern", "romantic", "vintage", "classic", "minimal"],
      required: true,
    },
    feature: { type: Boolean, default: false },
    priority: { type: Number, default: 0 },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    isLiked: {
      type: Boolean,
      defalut: false,
    },
    views: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
    discount: {
      type: { type: String, enum: ["rate", "amount"], default: "rate" },
      value: { type: Number, default: 0 },
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
      validate: {
        validator: function (this: any, value: mongoose.Types.ObjectId[]) {
          if (this.isPremium === false) {
            return value.length === 0;
          }
          return true;
        },
        message: "일반 상품은 옵션을 가질 수 없습니다.",
      },
    },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: ProductDB, ret: Record<string, any>) => {
        const { __v, updatedAt, deletedAt, id, ...rest } = ret;

        const result = {
          ...rest,
          _id: ret._id.toString(),
          createdAt: ret.createdAt.toISOString(),
          likes: ret.likes
            ? ret.likes.map((v: mongoose.Types.ObjectId) => v.toString())
            : [],
          options: ret.options
            ? ret.options.map((v: mongoose.Types.ObjectId) => v.toString())
            : [],
        };

        return result;
      },
    },
  },
);

export const ProductModel =
  mongoose.models.Product || model<ProductDocument>("Product", productSchema);
