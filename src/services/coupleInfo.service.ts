import { CoupleInfoDocument, CoupleInfoModel } from "@/models/coupleInfo.model";
import { dbConnect } from "@/shared/utils/mongodb";

interface Parent {
  name: string;
  phone: string;
  bankName?: string;
  accountNumber?: string;
}

interface CoupleSide {
  name: string;
  phone: string;
  bankName?: string;
  accountNumber?: string;
  father?: Parent;
  mother?: Parent;
}

interface GalleryImageGroup {
  category: string;
  urls: string[];
}

interface CoupleInfoInput {
  userId: string;
  groom: CoupleSide;
  bride: CoupleSide;
  weddingDate: Date;
  venue: string;
  address: string;
  message?: string;
  subwayStation?: string;
  guestbookEnabled: boolean;
  thumbnailImages: string[];
  galleryImages: GalleryImageGroup[];
}

export const createCoupleInfoService = async (
  data: CoupleInfoInput,
): Promise<boolean> => {
  await dbConnect();

  const newCoupleInfo = await new CoupleInfoModel({
    user: data.userId,
    groom: data.groom,
    bride: data.bride,
    weddingDate: data.weddingDate,
    venue: data.venue,
    address: data.address,
    message: data.message ?? "",
    subwayStation: data.subwayStation,
    guestbookEnabled: data.guestbookEnabled,
    thumbnailImages: data.thumbnailImages,
    galleryImages: data.galleryImages,
  }).save();

  return !!newCoupleInfo;
};

export const getCoupleInfoByUserId = async (userId: string) => {
  await dbConnect();

  const coupleInfo = await CoupleInfoModel.findOne({ user: userId }).lean();

  return coupleInfo;
};

export const updateCoupleInfoService = async (
  userId: string,
  data: Partial<CoupleInfoInput>,
): Promise<boolean> => {
  await dbConnect();

  const updated = await CoupleInfoModel.findOneAndUpdate(
    { user: userId },
    { $set: data },
    { new: true },
  );

  return !!updated;
};
