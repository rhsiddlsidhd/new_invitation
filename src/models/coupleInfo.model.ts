import mongoose, { Schema, Document, Model, Types } from "mongoose";

// 개인 기본 정보 (이름, 연락처)
interface Person {
  name: string;
  phone: string;
}

// 부모님 정보 (이름, 연락처, 계좌번호)
interface Parent extends Person {
  bankName?: string;
  accountNumber?: string;
}

// 신랑 또는 신부 측 정보
interface CoupleSide {
  name: string;
  phone: string;
  bankName?: string;
  accountNumber?: string;
  father?: Parent;
  mother?: Parent;
}

// 카테고리별 갤러리 이미지 그룹
interface GalleryImageGroup {
  category: string;
  urls: string[];
}

// 최종 CoupleInfo 문서 인터페이스
export interface CoupleInfoDocument extends Document {
  user: Types.ObjectId; // 청첩장 소유자 (User 모델 참조)
  groom: CoupleSide; // 신랑 정보
  bride: CoupleSide; // 신부 정보
  weddingDate: Date; // 결혼식 날짜 및 시간
  venue: string; // 결혼식 장소
  address: string; // 결혼식 상세 주소
  message: string; // 초대 문구
  subwayStation?: string; // 인근 지하철역
  guestbookEnabled: boolean; // 방명록 기능 활성화 여부
  thumbnailImages: string[]; // 메인 썸네일 이미지 목록
  galleryImages: GalleryImageGroup[]; // 카테고리별 갤러리 이미지 목록
  createdAt: Date;
  updatedAt: Date;
}

const ParentSchema = new Schema<Parent>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    bankName: { type: String },
    accountNumber: { type: String },
  },
  { _id: false },
);

const CoupleSideSchema = new Schema<CoupleSide>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    bankName: { type: String },
    accountNumber: { type: String },
    father: { type: ParentSchema, required: false },
    mother: { type: ParentSchema, required: false },
  },
  { _id: false },
);

const GalleryImageGroupSchema = new Schema<GalleryImageGroup>(
  {
    category: { type: String, required: true },
    urls: { type: [String], required: true },
  },
  { _id: false },
);

const coupleInfoSchema = new Schema<CoupleInfoDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 한 명의 유저는 하나의 커플 정보만 가질 수 있도록 설정
    },
    groom: {
      type: CoupleSideSchema,
      required: true,
    },
    bride: {
      type: CoupleSideSchema,
      required: true,
    },
    weddingDate: { type: Date, required: true },
    venue: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String, required: true },
    subwayStation: { type: String },
    guestbookEnabled: { type: Boolean, default: false },
    thumbnailImages: {
      type: [String],
      default: [],
    },
    galleryImages: {
      type: [GalleryImageGroupSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const CoupleInfoModel: Model<CoupleInfoDocument> =
  mongoose.models.CoupleInfo ||
  mongoose.model<CoupleInfoDocument>("CoupleInfo", coupleInfoSchema);
