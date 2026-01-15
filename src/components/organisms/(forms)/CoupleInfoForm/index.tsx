"use client";

import { BasicInfoSection } from "./basic-info-section";
import { CoupleInfoSection } from "./couple-info-section";
import { ParentsInfoSection } from "./parents-info-section";
import { ImagesSection } from "./images-section";
import { startTransition, useActionState, useEffect } from "react";
import { createCoupleInfoAction } from "@/actions/createCoupleInfoAction";
import { useRouter, useSearchParams } from "next/navigation";

import BottomActionBar from "../../BottomActionBar";
import { updateCouleInfoAction } from "@/actions/updateCouleInfoAction";
import { toast } from "sonner";
import { useImageUpload } from "./hooks/useImageUpload";

export function CoupleInfoForm({ type }: { type: "create" | "edit" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const coupleInfoId = searchParams.get("q");

  const currentAction =
    type === "edit" ? updateCouleInfoAction : createCoupleInfoAction;
  const [state, action] = useActionState(currentAction, null);

  const { processFormSubmit, uploadProgress, isUploading } = useImageUpload();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // ✅ 검증 → 업로드 → 정리 (통합)
    const cleanedFormData = await processFormSubmit(formData);
    if (!cleanedFormData) return; // 검증 실패 시 중단

    // Server Action 호출
    startTransition(() => action(cleanedFormData));
  };

  useEffect(() => {
    if (!state) return;

    if (state && state.success && state.data._id)
      switch (type) {
        case "create":
          router.push(`/payment?q=${state.data._id}`);
          break;
        case "edit":
          toast.success(state.data.message);
          router.push(`/order`);
          break;
        default:
          break;
      }
  }, [state, router, type]);

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

      {/* 업로드 진행 상황 */}
      {isUploading && (
        <div className="fixed right-4 bottom-4 rounded-lg border bg-white p-4 shadow-lg">
          <p className="mb-2 text-sm font-medium">이미지 업로드 중...</p>
          <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">{uploadProgress}%</p>
        </div>
      )}

      <BottomActionBar />
    </form>
  );
}
