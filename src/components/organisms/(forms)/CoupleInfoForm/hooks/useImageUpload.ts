import { useState } from "react";
import { toast } from "sonner";
import { validateAndFlatten } from "@/lib/validation/validateAndFlatten";
import { coupleInfoClientSchema } from "@/schemas/coupleInfo.schema";
import { extractFormDataForValidation } from "../utils/formDataExtractor";
import { processThumbnails, processGalleries } from "../utils/imageProcessor";
import { cleanFormData } from "../utils/formDataCleaner";

export function useImageUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const processFormSubmit = async (
    formData: FormData,
  ): Promise<FormData | null> => {
    setIsUploading(true);
    setUploadProgress(0);
    setErrors({});

    try {
      // ========================================
      // 1. FormData → 검증용 구조 변환
      // ========================================
      const clientData = extractFormDataForValidation(formData);
      console.log({ clientData });
      // ========================================
      // 2. 클라이언트 검증 (업로드 전!)
      // ========================================
      const validated = validateAndFlatten(coupleInfoClientSchema, clientData);

      if (!validated.success) {
        setErrors(validated.error);
        toast.error("입력값을 확인해주세요");
        return null; // ⚠️ 여기서 중단! 업로드 안 함
      }
      console.log("validated.data.galleryImages", validated.data.galleryImages);
      // ========================================
      // 3. 이미지 업로드 (검증 통과 후)
      // ========================================
      const thumbnailUrls = await processThumbnails(
        validated.data.thumbnailImages.existing,
        validated.data.thumbnailImages.newFiles,
        (progress) => setUploadProgress(progress * 0.5), // 0-50%
      );

      const galleryData = await processGalleries(validated.data.galleryImages);

      setUploadProgress(100);

      // ========================================
      // 4. FormData 정리
      // ========================================
      const cleanedFormData = cleanFormData(
        formData,
        thumbnailUrls,
        galleryData,
      );

      return cleanedFormData;
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("이미지 업로드에 실패했습니다");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    processFormSubmit,
    uploadProgress,
    isUploading,
    errors,
  };
}
