import { CoupleInfoModel, ICoupleInfo } from "@/models/coupleInfo.model";
import { CoupleInfoSchemaDto } from "@/schemas/coupleInfo.schema";
import { dbConnect } from "@/shared/utils/mongodb";
import mongoose from "mongoose";

// interface Parent {
//   name: string;
//   phone: string;
//   bankName?: string;
//   accountNumber?: string;
// }

// interface CoupleSide {
//   name: string;
//   phone: string;
//   bankName?: string;
//   accountNumber?: string;
//   father?: Parent;
//   mother?: Parent;
// }

// interface GalleryImageGroup {
//   category: string;
//   urls: string[];
// }

// interface CoupleInfoInput {
//   userId: string;
//   groom: CoupleSide;
//   bride: CoupleSide;
//   weddingDate: Date;
//   venue: string;
//   address: string;
//   message?: string;
//   subwayStation?: string;
//   guestbookEnabled: boolean;
//   thumbnailImages: string[];
//   galleryImages: GalleryImageGroup[];
// }

export const createCoupleInfoService = async (
  data: CoupleInfoSchemaDto & { userId: string; message: string },
): Promise<ICoupleInfo> => {
  await dbConnect();

  const weddingDateTime = new Date(`${data.weddingDate}T${data.weddingTime}`);

  const coupleInfo = {
    userId: new mongoose.Types.ObjectId(data.userId),
    groom: data.groom,
    bride: data.bride,
    weddingDate: weddingDateTime,
    venue: data.venue,
    address: data.address,
    message: data.message.trim() === "" ? "결혼을 축하합니다" : data.message,
    subwayStation: data.subwayStation,
    guestbookEnabled: data.guestbookEnabled,
    thumbnailImages: data.thumbnailImages,
    galleryImages: data.galleryImages,
  };

  console.log("여긴?", { coupleInfo });

  const newCoupleInfo = await CoupleInfoModel.create(coupleInfo);

  return newCoupleInfo.toJSON();
};

export const getCoupleInfoByUserId = async (userId: string) => {
  await dbConnect();

  const coupleInfo = await CoupleInfoModel.findOne({ user: userId }).lean();

  return coupleInfo;
};

export const getCoupleInfoById = async (
  coupleInfoId: string,
): Promise<ICoupleInfo | null> => {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(coupleInfoId)) {
    return null;
  }

  const coupleInfo = await CoupleInfoModel.findById(coupleInfoId).lean();

  return coupleInfo;
};

export const updateCoupleInfoService = async (
  userId: string,
  data: Partial<ICoupleInfo>,
): Promise<boolean> => {
  await dbConnect();

  const updated = await CoupleInfoModel.findOneAndUpdate(
    { user: userId },
    { $set: data },
    { new: true },
  );

  return !!updated;
};
