/**
 * FormData 정리 (파일 필드 삭제 + URL 저장)
 */
export function cleanFormData(
  formData: FormData,
  thumbnailUrls: string[],
  galleryData: Array<{ name: string; images: string[] }>
): FormData {
  // 1. 썸네일 파일 필드 삭제
  formData.delete("thumbnail-upload");
  formData.delete("thumbnail-upload_existing");

  // 2. 갤러리 파일 필드 삭제
  const galleryKeys = Array.from(formData.keys()).filter((key) =>
    key.startsWith("gallery-upload-")
  );
  const uniqueKeys = [...new Set(galleryKeys)];

  uniqueKeys.forEach((key) => {
    formData.delete(key);
    formData.delete(`${key}_existing`);
  });

  // 3. 최종 URL 저장
  formData.set("thumbnailSource", JSON.stringify(thumbnailUrls));
  formData.set("gallerySource", JSON.stringify(galleryData));

  return formData;
}
