import { ICoupleInfo } from "@/models/coupleInfo.model";

export interface FooterProps {
  message?: string;
}

export const mapCoupleInfoToFooterProps = (
  coupleInfo: ICoupleInfo,
): FooterProps => {
  return {
    message: coupleInfo.message,
  };
};
