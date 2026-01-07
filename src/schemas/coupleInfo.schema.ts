import z from "zod";

const ParentSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  phone: z.string().min(1, "연락처를 입력해주세요."),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
});

const CoupleSideSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  phone: z.string().min(1, "연락처를 입력해주세요."),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  father: ParentSchema.optional(),
  mother: ParentSchema.optional(),
});

const GalleryImageGroupSchema = z.object({
  category: z.string().min(1, "카테고리명을 입력해주세요."),
  urls: z.array(z.string().url("유효한 URL이어야 합니다.")),
});

export const coupleInfoSchema = z.object({
  groom: CoupleSideSchema,
  bride: CoupleSideSchema,
  weddingDate: z.string().min(1, "결혼식 날짜를 입력해주세요."),
  weddingTime: z.string().min(1, "결혼식 시간을 입력해주세요."),
  venue: z.string().min(1, "예식장명을 입력해주세요."),
  address: z.string().min(1, "주소를 입력해주세요."),
  addressDetail: z.string().min(1, "상세주소를 입력해주세요."),
  subwayStation: z.string().optional(),
  guestbookEnabled: z.boolean(),
  thumbnailImages: z.array(z.string().url("유효한 URL이어야 합니다.")),
  galleryImages: z.array(GalleryImageGroupSchema),
});

export type CoupleInfoSchemaDto = z.infer<typeof coupleInfoSchema>;
