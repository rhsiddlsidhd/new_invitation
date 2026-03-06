import { uploadMainThumbnail, uploadGalleryImages } from "@/lib/cloudinary";

/**
 * 썸네일 이미지 처리 (업로드 + 병합)
 */
export async function processThumbnails(
  existing: string[],
  newFiles: File[],
  onProgress?: (progress: number) => void
): Promise<string[]> {
  // 새 파일이 없으면 기존 URL만 반환
  if (newFiles.length === 0) {
    onProgress?.(100);
    return existing;
  }

  // 새 파일 업로드
  const uploadedUrls = await uploadMainThumbnail(newFiles, onProgress);

  // 기존 + 신규 병합
  return [...existing, ...(uploadedUrls ?? [])];
}

/**
 * 갤러리 이미지 처리 (업로드 + 병합)
 */
export async function processGalleries(
  galleryData: Array<{
    categoryId: string;
    categoryName: string;
    existing: string[];
    newFiles: File[];
  }>
): Promise<Array<{ name: string; images: string[] }>> {
  const results: Array<{ name: string; images: string[] }> = [];

  for (const gallery of galleryData) {
    // 빈 카테고리 무시 (이름도 없고 이미지도 없음)
    if (!gallery.categoryName && gallery.existing.length === 0 && gallery.newFiles.length === 0) {
      continue;
    }

    // 새 파일 업로드
    const uploadedUrls =
      gallery.newFiles.length > 0
        ? await uploadGalleryImages(gallery.newFiles)
        : [];

    // 기존 + 신규 병합
    const finalImages = [...gallery.existing, ...(uploadedUrls ?? [])];

    // 이름과 이미지가 모두 있는 경우에만 추가
    if (gallery.categoryName && finalImages.length > 0) {
      results.push({
        name: gallery.categoryName,
        images: finalImages,
      });
    }
  }

  return results;
}
