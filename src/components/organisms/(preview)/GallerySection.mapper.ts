import { ICoupleInfo } from "@/models/coupleInfo.model";

interface GalleryCategory {
  id: string;
  categoryName: string;
  images: string[];
}

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
