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
    addressDetail: data.addressDetail,
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

  const coupleInfo = await CoupleInfoModel.findById(
    new mongoose.Types.ObjectId(coupleInfoId),
  ).lean();

  return coupleInfo;
};

export const updateCoupleInfoService = async (
  coupleInfoId: string,
  userId: string,
  data: CoupleInfoSchemaDto & { message: string },
): Promise<boolean> => {
  await dbConnect();

  // 1. 권한 확인: 해당 coupleInfo가 현재 유저의 것인지 확인
  const coupleInfo = await CoupleInfoModel.findById(
    new mongoose.Types.ObjectId(coupleInfoId),
  );

  if (!coupleInfo) {
    return false; // 문서가 존재하지 않음
  }

  if (coupleInfo.userId.toString() !== userId) {
    throw new Error("권한이 없습니다."); // 권한 없음
  }

  // 2. weddingDateTime 변환 (createCoupleInfoService와 동일)
  const weddingDateTime = new Date(`${data.weddingDate}T${data.weddingTime}`);

  const updateData = {
    groom: data.groom,
    bride: data.bride,
    weddingDate: weddingDateTime,
    venue: data.venue,
    address: data.address,
    addressDetail: data.addressDetail,
    message: data.message.trim() === "" ? "결혼을 축하합니다" : data.message,
    subwayStation: data.subwayStation,
    guestbookEnabled: data.guestbookEnabled,
    thumbnailImages: data.thumbnailImages,
    galleryImages: data.galleryImages,
  };

  // 3. 업데이트 수행
  const updated = await CoupleInfoModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(coupleInfoId),
    { $set: updateData },
    { new: true },
  );

  return !!updated;
};
