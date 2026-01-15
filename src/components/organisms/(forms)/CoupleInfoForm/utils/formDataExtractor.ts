import type { CoupleInfoClientDto } from "@/schemas/coupleInfo.schema";

/**
 * FormData를 클라이언트 검증용 구조로 변환
 */
export function extractFormDataForValidation(
  formData: FormData,
): CoupleInfoClientDto {
  // ========================================
  // 1. 썸네일 추출
  // ========================================
  const existingThumbnails =
    JSON.parse(formData.get("thumbnail-upload_existing") as string) || [];

  const newThumbnailFiles = formData
    .getAll("thumbnail-upload")
    .filter((file) => file instanceof File && file.size > 0) as File[];

  // ========================================
  // 2. 갤러리 추출
  // ========================================
  const galleryKeys = Array.from(formData.keys()).filter((key) =>
    key.startsWith("gallery-upload-"),
  );
  const uniqueKeys = [...new Set(galleryKeys)];

  const galleryImages = uniqueKeys.map((key) => {
    const categoryId = key.replace("gallery-upload-", "");
    const categoryName =
      (formData.get(`category-name-${categoryId}`) as string) || "";

    const existing = JSON.parse(
      (formData.get(`${key}_existing`) as string) || "[]",
    );

    const newFiles = formData
      .getAll(key)
      .filter((file) => file instanceof File && file.size > 0) as File[];

    return {
      categoryId,
      categoryName,
      existing,
      newFiles,
    };
  });

  // ========================================
  // 3. 혼주 정보 추출 헬퍼
  // ========================================
  const buildParentData = (prefix: string) => {
    const name = (formData.get(`${prefix}_name`) as string) || "";
    const phone = (formData.get(`${prefix}_phone`) as string) || "";

    if (!name && !phone) return undefined;

    return {
      name,
      phone,
      bankName: (formData.get(`${prefix}_bank_name`) as string) || "",
      accountNumber: (formData.get(`${prefix}_account_number`) as string) || "",
    };
  };

  // ========================================
  // 4. 전체 데이터 구조
  // ========================================
  return {
    groom: {
      name: (formData.get("groom_name") as string) || "",
      phone: (formData.get("groom_phone") as string) || "",
      bankName: (formData.get("groom_bank_name") as string) || "",
      accountNumber: (formData.get("groom_account_number") as string) || "",
      father: buildParentData("groom_parents_father"),
      mother: buildParentData("groom_parents_mother"),
    },
    bride: {
      name: (formData.get("bride_name") as string) || "",
      phone: (formData.get("bride_phone") as string) || "",
      bankName: (formData.get("bride_bank_name") as string) || "",
      accountNumber: (formData.get("bride_account_number") as string) || "",
      father: buildParentData("bride_parents_father"),
      mother: buildParentData("bride_parents_mother"),
    },
    weddingDate: (formData.get("wedding_date") as string) || "",
    weddingTime: (formData.get("wedding_time") as string) || "",
    venue: (formData.get("venue_name") as string) || "",
    address: (formData.get("venue_address") as string) || "",
    addressDetail: (formData.get("venue_address_detail") as string) || "",
    subwayStation: (formData.get("subway_station") as string) || undefined,
    guestbookEnabled: formData.get("guestbook_enabled") === "on",
    thumbnailImages: {
      existing: existingThumbnails,
      newFiles: newThumbnailFiles,
    },
    galleryImages,
  };
}
