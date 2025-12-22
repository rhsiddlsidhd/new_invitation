import z from "zod";

//   =======================================

export const GalleryMapSchema = z.map(
  z.string(),
  z.object({
    type: z.enum(["A", "B", "C", "D", "E"]),
    images: z.array(
      z
        .instanceof(File)
        .refine(
          (file) => file && file instanceof File && file.size > 0,
          "이미지를 등록해주세요",
        )
        .refine(
          (file) =>
            ["image/png", "image/jpeg", "image/webp"].includes(file.type),
          "지원하지 않는 이미지 형식입니다.",
        ),
    ),
  }),
);

export const GallerySchema = z.object({
  id: z.string(),
  images: z.array(
    z
      .instanceof(File)
      .refine(
        (file) => file && file instanceof File && file.size > 0,
        "이미지를 등록해주세요",
      )
      .refine(
        (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
        "지원하지 않는 이미지 형식입니다.",
      ),
  ),
  type: z.enum(["A", "B", "C", "D", "E"]),
});

export const ThumbnailSchema = z.array(
  z
    .instanceof(File)
    .refine(
      (file) => file && file instanceof File && file.size > 0,
      "이미지를 등록해주세요",
    )
    .refine(
      (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
      "지원하지 않는 이미지 형식입니다.",
    ),
);

// ===============================================

const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
const accountRegex = /^[0-9-]{8,30}$/;

function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

const CloudinaryUploadResponseSchema = z.object({
  asset_id: z.string(),
  public_id: z.string(),
  version: z.number(),
  signature: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
  resource_type: z.string(),
  created_at: z.string(),
  bytes: z.number(),
  type: z.string(),
  url: z.string(),
  secure_url: z.string(),
  folder: z.string().optional(),
  original_filename: z.string(),
});

export const WeddingPartyInfoSchema = z
  .object({
    "groom-name": z
      .string()
      .min(1, "신랑 이름을 입력해주세요.")
      .max(20, "이름은 20자 이하로 입력해주세요."),
    "groom-phone": z
      .string()
      .regex(phoneRegex, "유효한 신랑 전화번호를 입력해주세요."),
    "groom-account": z
      .string()
      .regex(accountRegex, "유효한 신랑 계좌번호를 입력해주세요."),
    "bride-name": z
      .string()
      .min(1, "신부 이름을 입력해주세요.")
      .max(20, "이름은 20자 이하로 입력해주세요."),
    "bride-phone": z
      .string()
      .regex(phoneRegex, "유효한 신부 전화번호를 입력해주세요."),
    "bride-account": z
      .string()
      .regex(accountRegex, "유효한 신부 계좌번호를 입력해주세요."),
  })
  .transform((data) => {
    const camelCaseData: Record<string, string> = {};
    for (const key in data) {
      camelCaseData[toCamelCase(key)] = data[
        key as keyof typeof data
      ] as string;
    }
    return camelCaseData;
  });

export const WeddingDateInfoSchema = z
  .object({
    "wedding-date": z.string().min(1, "결혼 날짜를 입력해주세요."),
    "wedding-address": z.string().min(1, "결혼식 주소를 입력해주세요."),
    "wedding-detail-address": z.string().min(1, "상세 주소를 입력해주세요."),
  })
  .transform((data) => {
    const camelCaseData: Record<string, string> = {};
    for (const key in data) {
      camelCaseData[toCamelCase(key)] = data[
        key as keyof typeof data
      ] as string;
    }
    return camelCaseData;
  });

export const WeddingParentInfoSchema = z
  .object({
    "groom-father-name": z.string().optional(),
    "groom-father-phone": z.string().optional(),
    "groom-father-account": z.string().optional(),
    "groom-mother-name": z.string().optional(),
    "groom-mother-phone": z.string().optional(),
    "groom-mother-account": z.string().optional(),
    "bride-father-name": z.string().optional(),
    "bride-father-phone": z.string().optional(),
    "bride-father-account": z.string().optional(),
    "bride-mother-name": z.string().optional(),
    "bride-mother-phone": z.string().optional(),
    "bride-mother-account": z.string().optional(),
  })
  .transform((data) => {
    const camelCaseData: Record<string, string> = {};
    for (const key in data) {
      camelCaseData[toCamelCase(key)] = data[
        key as keyof typeof data
      ] as string;
    }
    return camelCaseData;
  });

export const WeddingInfoSchema = z
  .object({
    "groom-father-name": z.string().optional(),
    "groom-father-phone": z.string().optional(),
    "groom-father-account": z.string().optional(),
    "groom-mother-name": z.string().optional(),
    "groom-mother-phone": z.string().optional(),
    "groom-mother-account": z.string().optional(),
    "bride-father-name": z.string().optional(),
    "bride-father-phone": z.string().optional(),
    "bride-father-account": z.string().optional(),
    "bride-mother-name": z.string().optional(),
    "bride-mother-phone": z.string().optional(),
    "bride-mother-account": z.string().optional(),
    "wedding-date": z.string().min(1, "결혼 날짜를 입력해주세요."),
    "wedding-address": z.string().min(1, "결혼식 주소를 입력해주세요."),
    "wedding-detail-address": z.string().min(1, "상세 주소를 입력해주세요."),
    "groom-name": z
      .string()
      .min(1, "신랑 이름을 입력해주세요.")
      .max(20, "이름은 20자 이하로 입력해주세요."),
    "groom-phone": z
      .string()
      .regex(phoneRegex, "유효한 신랑 전화번호를 입력해주세요."),
    "groom-account": z
      .string()
      .regex(accountRegex, "유효한 신랑 계좌번호를 입력해주세요."),
    "bride-name": z
      .string()
      .min(1, "신부 이름을 입력해주세요.")
      .max(20, "이름은 20자 이하로 입력해주세요."),
    "bride-phone": z
      .string()
      .regex(phoneRegex, "유효한 신부 전화번호를 입력해주세요."),
    "bride-account": z
      .string()
      .regex(accountRegex, "유효한 신부 계좌번호를 입력해주세요."),
  })
  .transform((data) => {
    const camelCaseData: Record<string, string> = {};
    for (const key in data) {
      camelCaseData[toCamelCase(key)] = data[
        key as keyof typeof data
      ] as string;
    }
    return camelCaseData;
  });

export const galleryMapSchema = z.map(
  z.string(),
  z.object({
    type: z.enum(["A", "B", "C", "D", "E"]),
    images: z.array(CloudinaryUploadResponseSchema),
  }),
);

export const gallerySchema = z.array(
  z.object({
    id: z.string(),
    type: z.enum(["A", "B", "C", "D", "E"]),
    images: z.array(CloudinaryUploadResponseSchema),
  }),
);

export const thumbnailSchema = z.array(CloudinaryUploadResponseSchema);
