import { ICoupleInfo } from "@/models/coupleInfo.model";

export interface HeroSectionProps {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  venueName: string;
  thumbnailImage: string;
}

export const mapCoupleInfoToHeroProps = (
  coupleInfo: ICoupleInfo,
): HeroSectionProps => {
  return {
    groomName: coupleInfo.groom.name,
    brideName: coupleInfo.bride.name,
    weddingDate: coupleInfo.weddingDate,
    venueName: coupleInfo.venue,
    thumbnailImage: coupleInfo.thumbnailImages[0],
  };
};
