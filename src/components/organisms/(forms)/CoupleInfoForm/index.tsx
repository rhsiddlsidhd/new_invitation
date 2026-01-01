"use client";

import { Btn } from "@/components/atoms/Btn/Btn";

import { Save } from "lucide-react";
import { BasicInfoSection } from "./basic-info-section";
import { CoupleInfoSection } from "./couple-info-section";
import { ParentsInfoSection } from "./parents-info-section";
import { ImagesSection } from "./images-section";
import { startTransition, useActionState, useEffect } from "react";
import { createCoupleInfoAction } from "@/actions/createCoupleInfoAction";
import { uploadGalleryImages, uploadMainThumbnail } from "@/lib/cloudinary";
import { CloudinaryResource } from "@/lib/cloudinary/type";

export function CoupleInfoForm() {
  const [state, action, pending] = useActionState(createCoupleInfoAction, null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const date = formData.get("wedding_date") as string;
    if (!date) return alert("날짜를 선택해주세요");
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

    // Cloudinary에 업로드
    const thumbnailSource = await uploadMainThumbnail(thumbnail);

    const gallerySource = [];
    for (const { name, files } of galleryFiles) {
      const galleryImages = await uploadGalleryImages(files);
      gallerySource.push({
        name: name,
        images: galleryImages,
      });
    }

    // 원본 파일 제거 (1MB 제한 회피)
    formData.delete("thumbnail-upload");
    uniqueKeys.forEach((key) => formData.delete(key));

    // 업로드된 URL을 FormData에 추가
    if (thumbnailSource) {
      formData.set("thumbnailSource", JSON.stringify(thumbnailSource));
    }
    formData.set("gallerySource", JSON.stringify(gallerySource));

    startTransition(() => action(formData));
  };

  useEffect(() => {
    console.log("state", state);
  }, [state]);

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
