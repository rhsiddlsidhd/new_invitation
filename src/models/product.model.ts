import mongoose, { model, Schema, Document } from "mongoose";

export type Status = "active" | "inactive" | "soldOut";

export enum CategoryEnum {
  MODERN = "modern",
  ROMANTIC = "romantic",
  VINTAGE = "vintage",
  CLASSIC = "classic",
  MINIMAL = "minimal",
}
export interface BaseProduct {
  authorId: string; // 판매자 ID (상품 등록자)
  title: string; // 상품명
  description: string; // 상품 상세 설명
  thumbnail: string; // 상품 목록/카드용 썸네일 이미지
  previewUrl?: string; // 상세 페이지용 미리보기 URL (선택)
  price: number; // 기본 판매 가격
  category: CategoryEnum; // 카드 스타일/카테고리 (모던, 로맨틱 등)
  isPremium: boolean; // 유료 상품 여부 (옵션 선택 가능 여부 판단)
  options?: mongoose.Types.ObjectId[]; // 유료 상품 선택 옵션 목록 (isPremium=true일 때만 존재)
  feature: boolean; // 추천 상품 여부 (메인 노출용)
  priority: number; // 관리자 정렬 우선순위 (높을수록 상단)
}

export interface ProductModel extends BaseProduct {
  likes: number; // 좋아요 수 (관심도 지표)
  views: number; // 조회수 (노출/인기 지표)
  salesCount: number; // 판매 횟수 (실제 인기 지표)
  status: Status; // 판매 상태 (노출/비노출/품절)
}

export interface ProductDocument extends ProductModel, Document {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date; // 소프트 삭제 시점 (null이면 정상 노출)
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
      enum: Object.values(CategoryEnum),
      required: true,
    },
    feature: { type: Boolean, default: false },
    priority: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
    isPremium: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "soldOut"],
      default: "active",
    },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: "Feature",
      },
    ],
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: ProductDocument, ret: Record<string, any>) => {
        const { __v, createdAt, updatedAt, id, ...rest } = ret;

        const result = {
          ...rest,
          _id: ret._id.toString(),
          options: ret.options
            ? ret.options.map((v: mongoose.Types.ObjectId) => v.toString())
            : undefined,
        };

        return result;
      },
    },
  },
);

export const ProductModel =
  mongoose.models.Product || model<ProductDocument>("Product", productSchema);
