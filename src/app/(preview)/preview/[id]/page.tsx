import GuestBookAction from "@/components/organisms/(preview)/GuestBookAction";
import { HeroSection } from "@/components/organisms/(preview)/HeroSection";
import { InvitationMessage } from "@/components/organisms/(preview)/InvitationMessage";
import { DdayCounter } from "@/components/organisms/(preview)/DDayCounter";
import { GallerySection } from "@/components/organisms/(preview)/GallerySection";
import { LocationSection } from "@/components/organisms/(preview)/LocationSection";
import { ShareSection } from "@/components/organisms/(preview)/ShareSection";
import { Footer } from "@/components/organisms/(preview)/Footer";
import { getCoupleInfoById } from "@/services/coupleInfo.service";
import { getGuestbookService } from "@/services/guestbook.service";
import React from "react";

const COUPLEINFO_ID = process.env.NEXT_PUBLIC_PREVIEW_COUPLEINFO_ID;

const Page = async ({ params }: { params: { id: string } }) => {
  if (!COUPLEINFO_ID) throw new Error("COUPLEINFO_ID is required");
  const data = await getGuestbookService(COUPLEINFO_ID);
  const coupleInfoData = await getCoupleInfoById(COUPLEINFO_ID);

  if (!coupleInfoData) throw new Error("CoupleInfoData not found");

  // 갤러리 데이터 변환
  const galleryCategories = coupleInfoData.galleryImages.map((group, index) => ({
    id: `category-${index}`,
    categoryName: group.category,
    images: group.urls,
  }));

  return (
    <div className="relative">
      <HeroSection
        groomName={coupleInfoData.groom.name}
        brideName={coupleInfoData.bride.name}
        venueName={coupleInfoData.venue}
        thumbnailImage={coupleInfoData.thumbnailImages[0]}
        weddingDate={coupleInfoData.weddingDate}
      />

      <InvitationMessage
        message="평생 서로 사랑하며 함께 살아갈 수 있도록\n저희 두 사람의 소중한 첫걸음에\n귀한 걸음 하시어 축복해 주시면 감사하겠습니다."
        groomName={coupleInfoData.groom.name}
        brideName={coupleInfoData.bride.name}
        groomParents={{
          father: coupleInfoData.groom.father,
          mother: coupleInfoData.groom.mother,
        }}
        brideParents={{
          father: coupleInfoData.bride.father,
          mother: coupleInfoData.bride.mother,
        }}
      />

      <DdayCounter weddingDate={new Date(coupleInfoData.weddingDate)} />

      <GallerySection categories={galleryCategories} />

      <LocationSection
        venueName={coupleInfoData.venue}
        address={coupleInfoData.address}
        addressDetail={coupleInfoData.addressDetail}
      />

      <GuestBookAction id={COUPLEINFO_ID} data={data} />

      <ShareSection invitationId={params.id} />

      <Footer />
    </div>
  );
};

export default Page;
