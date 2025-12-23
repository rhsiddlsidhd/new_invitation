import { model, Schema } from "mongoose";

export interface Option {
  featureId: string; // 참조 Feature ID
  code: string; // Feature 코드
  label: string; // Feature 라벨
  additionalPrice: number; // Feature 가격
}

export interface Product extends Document {
  authorId: string; // 판매자 ID (상품 등록자)

  title: string; // 상품명
  description: string; // 상품 상세 설명
  thumbnail: string; // 상품 목록/카드용 썸네일 이미지
  previewUrl?: string; // 상세 페이지용 미리보기 URL (선택)

  price: number; // 기본 판매 가격
  category: string; // 카드 스타일/카테고리 (모던, 로맨틱 등)

  feature: boolean; // 추천 상품 여부 (메인 노출용)
  priority: number; // 관리자 정렬 우선순위 (높을수록 상단)

  likes: number; // 좋아요 수 (관심도 지표)
  views: number; // 조회수 (노출/인기 지표)
  salesCount: number; // 판매 횟수 (실제 인기 지표)

  isPremium: boolean; // 유료 상품 여부 (옵션 선택 가능 여부 판단)
  status: "active" | "inactive" | "soldOut";
  // 판매 상태 (노출/비노출/품절)

  options?: Option[]; // 유료 상품 선택 옵션 목록 (isPremium=true일 때만 존재)

  deletedAt?: Date; // 소프트 삭제 시점 (null이면 정상 노출)

  createdAt: Date; // 상품 최초 등록일 (MongoDB 자동 생성)
  updatedAt: Date; // 상품 수정일 (MongoDB 자동 갱신)
}

const productSchema = new Schema<Product>(
  {
    authorId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    previewUrl: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
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
        featureId: {
          type: Schema.Types.ObjectId,
          ref: "Feature",
          required: true,
        },
        code: { type: String, required: true },
        label: { type: String, required: true },
        additionalPrice: { type: Number, default: 0 },
      },
    ],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const ProductModel = model<Product>("Product", productSchema);
