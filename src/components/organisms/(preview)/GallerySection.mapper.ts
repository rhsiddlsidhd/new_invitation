import { ICoupleInfo } from "@/models/coupleInfo.model";

export interface GallerySectionProps {
  categories: { id: string; categoryName: string; images: string[] }[];
}

export const mapCoupleInfoToGalleryProps = (
  coupleInfo: ICoupleInfo,
): GallerySectionProps => {
  const galleryCategories = coupleInfo.galleryImages.map((group, index) => ({
    id: `category-${index}`,
    categoryName: group.category,
    images: group.urls,
  }));

  return {
    categories: galleryCategories,
  };
};
