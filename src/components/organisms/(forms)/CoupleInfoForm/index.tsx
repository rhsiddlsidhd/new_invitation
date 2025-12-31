"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
// import { type CoupleInfo, coupleInfoSchema } from "@/types/couple";

import { Eye, Save } from "lucide-react";
import { BasicInfoSection } from "./basic-info-section";
import { CoupleInfoSection } from "./couple-info-section";
import { ParentsInfoSection } from "./parents-info-section";
import { ImagesSection } from "./images-section";

export function CoupleInfoForm() {
  // const form = useForm<CoupleInfo>({
  //   resolver: zodResolver(coupleInfoSchema),
  //   defaultValues: {
  //     guestbookEnabled: true,
  //     thumbnailImages: [],
  //     galleryCategories: [],
  //   },
  // })

  const handlePreview = () => {
    console.log("[v0] Preview clicked");
    // TODO: Open preview modal or new window
  };

  return (
    <form className="space-y-6">
      {/* 기본 정보 */}
      <BasicInfoSection />

      {/* 신랑 & 신부 정보 */}
      <CoupleInfoSection />

      {/* 혼주 정보 */}
      <ParentsInfoSection />

      {/* 이미지 정보 */}
      <ImagesSection />

      {/* Sticky Bottom Actions */}
      <div className="bg-background/95 border-border fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="mx-auto flex max-w-5xl gap-4">
            <Btn
              type="button"
              variant="outline"
              size="lg"
              className="flex-1 bg-transparent"
              onClick={handlePreview}
            >
              <Eye className="mr-2 h-5 w-5" />
              미리보기
            </Btn>
            <Btn type="submit" size="lg" className="flex-1">
              <Save className="mr-2 h-5 w-5" />
              저장하기
            </Btn>
          </div>
        </div>
      </div>
    </form>
  );
}
