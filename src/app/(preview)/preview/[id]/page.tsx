import { mapCoupleInfoToHeroProps } from "@/components/organisms/(preview)/heroSection.mapper";
import { InvitationMessage } from "@/components/organisms/(preview)/InvitationMessage";
import { GallerySection } from "@/components/organisms/(preview)/GallerySection";
import { LocationSection } from "@/components/organisms/(preview)/LocationSection";
import { Footer } from "@/components/organisms/(preview)/Footer";
import { getCoupleInfoById } from "@/services/coupleInfo.service";
import { mapCoupleInfoToAccountProps } from "@/components/organisms/(preview)/accountSection.mapper";
import { getGuestbookService } from "@/services/guestbook.service";
import { getActiveFeaturesByCoupleInfoId } from "@/services/order.service";
import React from "react";
import WeddingMonthCalendar from "@/components/organisms/(preview)/WeddingMonthCalendar";
import GuestBookSection from "@/components/organisms/(preview)/GuestBookSection";
import AccountSection from "@/components/organisms/(preview)/AccountSection";
import CloudImage from "@/components/molecules/CloudImage";
import { mapCoupleInfoToCalendarProps } from "@/components/organisms/(preview)/weddingMonthCalendar.mapper";
import { mapCoupleInfoToGalleryProps } from "@/components/organisms/(preview)/gallerySection.mapper";
import { mapCoupleInfoToLocationProps } from "@/components/organisms/(preview)/locationSection.mapper";
import { mapDataToGuestbookProps } from "@/components/organisms/(preview)/guestBookSection.mapper";
import { mapCoupleInfoToThumbnails } from "@/components/organisms/(preview)/thumbnails.mapper";
import { HeroSection } from "@/components/organisms/(preview)/HeroSection";
import { mapCoupleInfoToInvitationProps } from "@/components/organisms/(preview)/invitationMessage.mapper";
import { getThemeByProductId } from "@/constants/theme";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ product?: string }>;
}) => {
  const { id } = await params;
  const { product: productId } = await searchParams;

  const isSample = !!productId;

  const [data, coupleInfoData, orderInfo] = await Promise.all([
    getGuestbookService(id),
    getCoupleInfoById(id),
    getActiveFeaturesByCoupleInfoId(id),
  ]);

  const activeFeatures = isSample
    ? ["HORIZONTAL_SLIDE"] // 샘플: 전체 프리미엄 기능 ON
    : orderInfo;

  const theme = getThemeByProductId(
    isSample ? productId : undefined, // TODO: 실제 유저는 order에서 productId 추출
  );

  if (!coupleInfoData) throw new Error("CoupleInfoData not found");

  const heroProps = mapCoupleInfoToHeroProps(coupleInfoData);
  const calendarProps = mapCoupleInfoToCalendarProps(coupleInfoData);
  const galleryProps = mapCoupleInfoToGalleryProps(
    coupleInfoData,
    activeFeatures.includes("HORIZONTAL_SLIDE"),
  );
  const locationProps = mapCoupleInfoToLocationProps(coupleInfoData);
  const guestbookProps = mapDataToGuestbookProps(id, data);
  const thumbnailProps = mapCoupleInfoToThumbnails(coupleInfoData);
  const invitationMessageProps = mapCoupleInfoToInvitationProps(coupleInfoData);
  const accountSectionProps = mapCoupleInfoToAccountProps(coupleInfoData);

  return (
    <div className="relative" data-theme={theme}>
      {theme === "blossom" && (
        <>
          <span className="blossom-petal">🌸</span>
          <span className="blossom-petal">🌸</span>
          <span className="blossom-petal">🌸</span>
          <span className="blossom-petal">🌸</span>
          <span className="blossom-petal">🌸</span>
          <span className="blossom-petal">🌸</span>
        </>
      )}
      <HeroSection {...heroProps} />
      <InvitationMessage {...invitationMessageProps} />
      <WeddingMonthCalendar {...calendarProps} />
      <GallerySection {...galleryProps} />
      <LocationSection {...locationProps} />

      <div className="relative h-[50vh] w-full">
        <CloudImage
          src={thumbnailProps.divider}
          sizes="(max-width: 512px) 100vw, 512px"
        />
      </div>

      <GuestBookSection {...guestbookProps} />
      <AccountSection {...accountSectionProps} />

      <Footer>
        {/* <div className="via-35%-white absolute top-0 z-10 h-[10vh] w-full bg-linear-to-b from-white to-white/0" /> */}
        <CloudImage
          src={thumbnailProps.footer}
          sizes="(max-width: 512px) 100vw, 512px"
        />
        {/* <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/40" /> */}
      </Footer>
    </div>
  );
};

export default Page;
