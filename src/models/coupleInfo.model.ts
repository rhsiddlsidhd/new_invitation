import mongoose, { Schema, Model, Types } from "mongoose";

// 공통 변환 함수 (중첩된 객체 내의 ObjectId를 찾아 string으로 변환)
const transformIds = (obj: any) => {
  if (!obj || typeof obj !== "object") return;
  for (const key in obj) {
    if (obj[key] instanceof mongoose.Types.ObjectId) {
      obj[key] = obj[key].toString();
    } else if (typeof obj[key] === "object") {
      transformIds(obj[key]);
    }
  }
};
// 공통 타입 정의
interface Person {
  name: string;
  phone: string;
}

interface Parent extends Person {
  bankName?: string;
  accountNumber?: string;
}

interface CoupleSide extends Person {
  bankName?: string;
  accountNumber?: string;
  father?: Parent;
  mother?: Parent;
}

interface GalleryImageGroup {
  category: string;
  urls: string[];
}

export interface ICoupleInfo {
  _id: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  groom: CoupleSide;
  bride: CoupleSide;
  weddingDate: Date;
  venue: string;
  address: string;
  message: string;
  subwayStation?: string;
  guestbookEnabled: boolean;
  thumbnailImages: string[];
  galleryImages: GalleryImageGroup[];
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

const coupleInfoSchema = new Schema<ICoupleInfo>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    message: { type: String, default: "저희 결혼합니다." },
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
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret: Record<string, any>) => {
        // 모든 깊이의 ObjectId를 찾아 string으로 변환 (재귀 방식)
        transformIds(ret);
        return ret;
      },
    },
  },
);

export const CoupleInfoModel: Model<ICoupleInfo> =
  mongoose.models.CoupleInfo ||
  mongoose.model<ICoupleInfo>("CoupleInfo", coupleInfoSchema);
