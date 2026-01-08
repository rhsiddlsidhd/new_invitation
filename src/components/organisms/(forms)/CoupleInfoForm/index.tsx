"use client";

import { BasicInfoSection } from "./basic-info-section";
import { CoupleInfoSection } from "./couple-info-section";
import { ParentsInfoSection } from "./parents-info-section";
import { ImagesSection } from "./images-section";
import { startTransition, useActionState, useEffect } from "react";
import { createCoupleInfoAction } from "@/actions/createCoupleInfoAction";
import { uploadGalleryImages, uploadMainThumbnail } from "@/lib/cloudinary";
import { useRouter, useSearchParams } from "next/navigation";

import BottomActionBar from "../../BottomActionBar";
import { updateCouleInfoAction } from "@/actions/updateCouleInfoAction";

export function CoupleInfoForm({ type }: { type: "create" | "edit" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const coupleInfoId = searchParams.get("q");

  const currentAction =
    type === "edit" ? updateCouleInfoAction : createCoupleInfoAction;
  const [state, action] = useActionState(currentAction, null);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const date = formData.get("wedding_date") as string;
    if (!date) return alert("날짜를 선택해주세요");

    // ========================================
    // 1. 썸네일 처리 (thumbnail)
    // ========================================

    // 1-1. 기존 썸네일 URL 추출
    const existingThumbnails = JSON.parse(
      (formData.get("thumbnail-upload_existing") as string) || "[]",
    );

    // 1-2. 새 파일 추출
    const newThumbnailFiles = formData
      .getAll("thumbnail-upload")
      .filter((file) => file instanceof File && file.size > 0) as File[];

    // 1-3. 새 파일만 업로드
    const uploadedThumbnails =
      newThumbnailFiles.length > 0
        ? await uploadMainThumbnail(newThumbnailFiles)
        : [];

    // 1-4. 기존 + 신규 병합
    const finalThumbnails = [
      ...existingThumbnails,
      ...(uploadedThumbnails ?? []),
    ];

    // ========================================
    // 2. 갤러리 처리 (gallery)
    // ========================================

    // 2-1. 갤러리 키 추출
    const galleryKeys = Array.from(formData.keys()).filter((key) =>
      key.startsWith("gallery-upload-"),
    );
    const uniqueKeys = [...new Set(galleryKeys)];

    // 2-2. 각 갤러리 카테고리 처리
    const finalGallerySource = [];
    for (const key of uniqueKeys) {
      const categoryId = key.replace("gallery-upload-", "");
      const categoryName = formData.get(
        `category-name-${categoryId}`,
      ) as string;

      // 2-2-1. 기존 이미지 URL 추출
      const existingGalleryImages = JSON.parse(
        (formData.get(`${key}_existing`) as string) || "[]",
      );

      // 2-2-2. 새 파일 추출
      const newGalleryFiles = formData
        .getAll(key)
        .filter((file) => file instanceof File && file.size > 0) as File[];

      // 2-2-3. 새 파일만 업로드
      const uploadedGalleryImages =
        newGalleryFiles.length > 0
          ? await uploadGalleryImages(newGalleryFiles)
          : [];

      // 2-2-4. 기존 + 신규 병합
      const finalImages = [
        ...existingGalleryImages,
        ...(uploadedGalleryImages ?? []),
      ];

      // 유효성 검사
      if (finalImages.length > 0 && !categoryName) {
        alert("이미지가 추가된 갤러리의 카테고리 이름을 입력해주세요.");
        return; // 제출 중단
      }

      if (categoryName && finalImages.length === 0) {
        alert(`'${categoryName}' 카테고리에 이미지를 1개 이상 추가해주세요.`);
        return; // 제출 중단
      }

      // 이름과 이미지가 모두 있는 경우에만 추가
      if (categoryName && finalImages.length > 0) {
        finalGallerySource.push({
          name: categoryName,
          images: finalImages,
        });
      }
    }

    // ========================================
    // 3. FormData 정리 및 저장
    // ========================================

    // 3-1. 원본 파일 및 _existing 제거
    formData.delete("thumbnail-upload");
    formData.delete("thumbnail-upload_existing");
    uniqueKeys.forEach((key) => {
      formData.delete(key);
      formData.delete(`${key}_existing`);
    });

    // 3-2. 최종 결과 저장
    formData.set("thumbnailSource", JSON.stringify(finalThumbnails));
    formData.set("gallerySource", JSON.stringify(finalGallerySource));

    // 3-3. 서버 액션 호출
    startTransition(() => action(formData));
  };

  useEffect(() => {
    if (!state || !state.success) return;
    console.log(state);

    if (state && state.success && state.data._id)
      router.push(`/payment?q=${state.data._id}`);
  }, [state, router]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Hidden input for edit mode */}
      {type === "edit" && coupleInfoId && (
        <input type="hidden" name="couple_info_id" value={coupleInfoId} />
      )}

      {/* 기본 정보 */}
      <BasicInfoSection />

      {/* 신랑 & 신부 정보 */}
      <CoupleInfoSection />

      {/* 혼주 정보 */}
      <ParentsInfoSection />

      {/* 이미지 정보 */}
      <ImagesSection />

      <BottomActionBar />
    </form>
  );
}
