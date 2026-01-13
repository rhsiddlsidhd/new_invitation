import { HeroSection } from "@/components/organisms/(preview)/HeroSection";
import { InvitationMessage } from "@/components/organisms/(preview)/InvitationMessage";

import { GallerySection } from "@/components/organisms/(preview)/GallerySection";
import { LocationSection } from "@/components/organisms/(preview)/LocationSection";
import { ShareSection } from "@/components/organisms/(preview)/ShareSection";
import { Footer } from "@/components/organisms/(preview)/Footer";
import { mapCoupleInfoToInvitationProps } from "@/components/organisms/(preview)/InvitationMessage.mapper";
import { getCoupleInfoById } from "@/services/coupleInfo.service";
import { mapCoupleInfoToAccountProps } from "@/components/organisms/(preview)/AccountSection.mapper";
import { getGuestbookService } from "@/services/guestbook.service";
import React from "react";

import WeddingMonthCalendar from "@/components/organisms/(preview)/WeddingMonthCalendar";
import GuestBookSection from "@/components/organisms/(preview)/GuestBookSection";
import AccountSection from "@/components/organisms/(preview)/AccountSection";

const COUPLEINFO_ID = process.env.NEXT_PUBLIC_PREVIEW_COUPLEINFO_ID;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!COUPLEINFO_ID) throw new Error("COUPLEINFO_ID is required");
  const data = await getGuestbookService(COUPLEINFO_ID);
  const coupleInfoData = await getCoupleInfoById(COUPLEINFO_ID);

  if (!coupleInfoData) throw new Error("CoupleInfoData not found");

  // 갤러리 데이터 변환
  const galleryCategories = coupleInfoData.galleryImages.map(
    (group, index) => ({
      id: `category-${index}`,
      categoryName: group.category,
      images: group.urls,
    }),
  );

  // InvitationMessage에 전달할 props를 매퍼 함수를 통해 생성
  const invitationMessageProps = mapCoupleInfoToInvitationProps(coupleInfoData);

  // AccountSection에 전달할 props를 매퍼 함수를 통해 생성
  const accountSectionProps = mapCoupleInfoToAccountProps(coupleInfoData);

  console.log(coupleInfoData);

  return (
    <div className="relative">
      <HeroSection
        groomName={coupleInfoData.groom.name}
        brideName={coupleInfoData.bride.name}
        venueName={coupleInfoData.venue}
        thumbnailImage={coupleInfoData.thumbnailImages[0]}
        weddingDate={coupleInfoData.weddingDate}
      />

      <InvitationMessage {...invitationMessageProps} />

      <WeddingMonthCalendar date={coupleInfoData.weddingDate} />

      <LocationSection
        venueName={coupleInfoData.venue}
        address={coupleInfoData.address}
        addressDetail={coupleInfoData.addressDetail}
      />

      <GallerySection categories={galleryCategories} />

      <GuestBookSection id={COUPLEINFO_ID} data={data} />

      <AccountSection {...accountSectionProps} />

      {/* <ShareSection invitationId={id} /> */}

      {/* <Footer /> */}
    </div>
  );
};

export default Page;
