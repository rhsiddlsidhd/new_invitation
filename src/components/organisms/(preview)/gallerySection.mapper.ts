import { ICoupleInfo } from "@/models/coupleInfo.model";

export interface GallerySectionProps {
  images: string[];
}

export const mapCoupleInfoToGalleryProps = (
  coupleInfo: ICoupleInfo,
): GallerySectionProps => ({
  images: coupleInfo.galleryImages,
});
