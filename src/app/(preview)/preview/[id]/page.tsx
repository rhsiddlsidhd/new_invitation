import { mapCoupleInfoToHeroProps } from "@/components/organisms/(preview)/heroSection.mapper";
import { InvitationMessage } from "@/components/organisms/(preview)/InvitationMessage";
import { GallerySection } from "@/components/organisms/(preview)/GallerySection";
import { LocationSection } from "@/components/organisms/(preview)/LocationSection";
import { Footer } from "@/components/organisms/(preview)/Footer";
import { getCoupleInfoById } from "@/services/coupleInfo.service";
import { mapCoupleInfoToAccountProps } from "@/components/organisms/(preview)/accountSection.mapper";
import { getGuestbookService } from "@/services/guestbook.service";
import React from "react";
import WeddingMonthCalendar from "@/components/organisms/(preview)/WeddingMonthCalendar";
import GuestBookSection from "@/components/organisms/(preview)/GuestBookSection";
import AccountSection from "@/components/organisms/(preview)/AccountSection";
import ProductThumbnail from "@/components/molecules/ProductThumbnail";
import { mapCoupleInfoToCalendarProps } from "@/components/organisms/(preview)/weddingMonthCalendar.mapper";
import { mapCoupleInfoToGalleryProps } from "@/components/organisms/(preview)/gallerySection.mapper";
import { mapCoupleInfoToLocationProps } from "@/components/organisms/(preview)/locationSection.mapper";
import { mapDataToGuestbookProps } from "@/components/organisms/(preview)/guestBookSection.mapper";
import { mapCoupleInfoToFooterProps } from "@/components/organisms/(preview)/footer.mapper";
import { mapCoupleInfoToThumbnails } from "@/components/organisms/(preview)/thumbnails.mapper";
import { HeroSection } from "@/components/organisms/(preview)/HeroSection";
import { mapCoupleInfoToInvitationProps } from "@/components/organisms/(preview)/invitationMessage.mapper";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const data = await getGuestbookService(id);
  const coupleInfoData = await getCoupleInfoById(id);

  if (!coupleInfoData) throw new Error("CoupleInfoData not found");

  const heroProps = mapCoupleInfoToHeroProps(coupleInfoData);
  const calendarProps = mapCoupleInfoToCalendarProps(coupleInfoData);
  const galleryProps = mapCoupleInfoToGalleryProps(coupleInfoData);
  const locationProps = mapCoupleInfoToLocationProps(coupleInfoData);
  const guestbookProps = mapDataToGuestbookProps(id, data);
  const footerProps = mapCoupleInfoToFooterProps(coupleInfoData);
  const thumbnailProps = mapCoupleInfoToThumbnails(coupleInfoData);
  const invitationMessageProps = mapCoupleInfoToInvitationProps(coupleInfoData);
  const accountSectionProps = mapCoupleInfoToAccountProps(coupleInfoData);

  return (
    <div className="relative">
      <HeroSection {...heroProps} />
      <InvitationMessage {...invitationMessageProps} />
      <WeddingMonthCalendar {...calendarProps} />
      <GallerySection {...galleryProps} />
      <LocationSection {...locationProps} />

      <div className="relative h-[50vh] w-full">
        <div className="via-55%-white absolute top-0 z-10 h-[10vh] w-full bg-linear-to-b from-white to-white/0" />
        <div className="via-55%-white absolute bottom-0 z-10 h-[10vh] w-full bg-linear-to-t from-white to-white/0" />
        <ProductThumbnail src={thumbnailProps.divider} />
      </div>

      <GuestBookSection {...guestbookProps} />
      <AccountSection {...accountSectionProps} />

      <Footer {...footerProps}>
        <div className="via-35%-white absolute top-0 z-10 h-[10vh] w-full bg-linear-to-b from-white to-white/0" />
        <ProductThumbnail src={thumbnailProps.footer} />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/40" />
      </Footer>
    </div>
  );
};

export default Page;
