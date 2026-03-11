import { ICoupleInfo } from "@/models/coupleInfo.model";

export interface FooterProps {
  message: string;
}

export const mapCoupleInfoToFooterProps = (
  coupleInfo: ICoupleInfo,
): FooterProps => ({
  message: `저희 두 사람의 시작을 축복해 주셔서 감사합니다. ${coupleInfo.groom.name} & ${coupleInfo.bride.name} 올림.`,
});
