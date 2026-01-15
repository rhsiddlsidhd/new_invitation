import { mapCoupleInfoToHeroProps } from "@/components/organisms/(preview)/heroSection.mapper";
import { InvitationMessage } from "@/components/organisms/(preview)/InvitationMessage";

import { GallerySection } from "@/components/organisms/(preview)/GallerySection";
import { LocationSection } from "@/components/organisms/(preview)/LocationSection";
import { Footer } from "@/components/organisms/(preview)/Footer";
import { mapCoupleInfoToInvitationProps } from "@/components/organisms/(preview)/invitationMessage.mapper";
import { getCoupleInfoById } from "@/services/coupleInfo.service";
import { mapCoupleInfoToAccountProps } from "@/components/organisms/(preview)/accountSection.mapper";
import { getGuestbookService } from "@/services/guestbook.service";
import React from "react";

import WeddingMonthCalendar from "@/components/organisms/(preview)/WeddingMonthCalendar";
import GuestBookSection from "@/components/organisms/(preview)/GuestBookSection";
import AccountSection from "@/components/organisms/(preview)/AccountSection";
import LoaderThumbnail from "@/components/atoms/LoaderThumbnail";
import { mapCoupleInfoToCalendarProps } from "@/components/organisms/(preview)/weddingMonthCalendar.mapper";
import { mapCoupleInfoToGalleryProps } from "@/components/organisms/(preview)/gallerySection.mapper";
import { mapCoupleInfoToLocationProps } from "@/components/organisms/(preview)/locationSection.mapper";
import { mapDataToGuestbookProps } from "@/components/organisms/(preview)/guestBookSection.mapper";
import { mapCoupleInfoToFooterProps } from "@/components/organisms/(preview)/footer.mapper";
import { mapCoupleInfoToThumbnails } from "@/components/organisms/(preview)/thumbnails.mapper";
import { HeroSection } from "@/components/organisms/(preview)/HeroSection";

const COUPLEINFO_ID = process.env.NEXT_PUBLIC_PREVIEW_COUPLEINFO_ID;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!COUPLEINFO_ID) throw new Error("COUPLEINFO_ID is required");
  const data = await getGuestbookService(COUPLEINFO_ID);
  const coupleInfoData = await getCoupleInfoById(COUPLEINFO_ID);

  if (!coupleInfoData) throw new Error("CoupleInfoData not found");

  const heroProps = mapCoupleInfoToHeroProps(coupleInfoData);
  const calendarProps = mapCoupleInfoToCalendarProps(coupleInfoData);
  const galleryProps = mapCoupleInfoToGalleryProps(coupleInfoData);
  const locationProps = mapCoupleInfoToLocationProps(coupleInfoData);
  const guestbookProps = mapDataToGuestbookProps(COUPLEINFO_ID, data);
  const footerProps = mapCoupleInfoToFooterProps(coupleInfoData);
  const thumbnailProps = mapCoupleInfoToThumbnails(coupleInfoData);

  // InvitationMessage에 전달할 props를 매퍼 함수를 통해 생성
  const invitationMessageProps = mapCoupleInfoToInvitationProps(coupleInfoData);

  // AccountSection에 전달할 props를 매퍼 함수를 통해 생성
  const accountSectionProps = mapCoupleInfoToAccountProps(coupleInfoData);

  return (
    <div className="relative">
      <HeroSection {...heroProps} />

      <InvitationMessage {...invitationMessageProps} />

      <WeddingMonthCalendar {...calendarProps} />

      <GallerySection {...galleryProps} />

      <LocationSection {...locationProps} />

      <div className="relative h-[50vh] w-full">
        {/* <WavyDivider className="absolute -top-15 z-100 h-[10vh] w-full" /> */}
        <div className="via-55%-white absolute top-0 z-10 h-[10vh] w-full bg-linear-to-b from-white to-white/0" />
        <div className="via-55%-white absolute bottom-0 z-10 h-[10vh] w-full bg-linear-to-t from-white to-white/0" />
        <LoaderThumbnail src={thumbnailProps.divider} />
      </div>

      <GuestBookSection {...guestbookProps} />

      <AccountSection {...accountSectionProps} />

      {/* <ShareSection invitationId={id} /> */}

      <Footer {...footerProps}>
        <div className="via-35%-white absolute top-0 z-10 h-[10vh] w-full bg-linear-to-b from-white to-white/0" />

        <LoaderThumbnail src={thumbnailProps.footer} />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/40" />
      </Footer>
    </div>
  );
};

export default Page;
