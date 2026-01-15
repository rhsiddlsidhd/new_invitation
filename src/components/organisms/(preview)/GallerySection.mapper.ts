import { ICoupleInfo } from "@/models/coupleInfo.model";
import { GalleryCategory } from "@/types/couple";

export interface GallerySectionProps {
  categories: GalleryCategory[];
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
