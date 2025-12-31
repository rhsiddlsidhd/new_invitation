"use client";

import { Btn } from "@/components/atoms/Btn/Btn";

import { Save } from "lucide-react";
import { BasicInfoSection } from "./basic-info-section";
import { CoupleInfoSection } from "./couple-info-section";
import { ParentsInfoSection } from "./parents-info-section";
import { ImagesSection } from "./images-section";
import { useActionState } from "react";
import { createCoupleInfoAction } from "@/actions/createCoupleInfoAction";

export function CoupleInfoForm() {
  // const [state, action, pending] = useActionState(createCoupleInfoAction, null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // 썸네일 (고정 name)
    const thumbnail = formData.getAll("thumbnail-upload") as File[];

    // 갤러리 (동적 name - gallery-upload-로 시작하는 모든 유니크한 키 찾기)
    const galleryKeys = Array.from(formData.keys()).filter((key) =>
      key.startsWith("gallery-upload-"),
    );
    const uniqueKeys = [...new Set(galleryKeys)];

    const galleryFiles = uniqueKeys.map((key) => {
      const categoryId = key.replace("gallery-upload-", "");
      const name = formData.get(`category-name-${categoryId}`) as string;

      return {
        name,
        files: formData
          .getAll(key)
          .filter((file) => file instanceof File && file.size > 0) as File[],
      };
    });

    console.log("Thumbnail:", thumbnail);
    console.log("Gallery:", galleryFiles);
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
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
            {/* <Btn
              type="button"
              variant="outline"
              size="lg"
              className="flex-1 bg-transparent"
            >
              <Eye className="mr-2 h-5 w-5" />
              미리보기
            </Btn> */}
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
