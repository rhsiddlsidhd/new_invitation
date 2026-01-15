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

// 클라이언트 검증용 스키마 (업로드 전 검증)
export const coupleInfoClientSchema = coupleInfoSchema
  .omit({ thumbnailImages: true, galleryImages: true })
  .extend({
    // 썸네일 이미지 검증 (업로드 전)
    thumbnailImages: z
      .object({
        existing: z.array(z.string().url("유효한 URL이어야 합니다.")),
        newFiles: z
          .array(z.instanceof(File))
          .max(10, "썸네일은 최대 10장까지 업로드 가능합니다.")
          .refine(
            (files) => files.every((f) => f.size <= 10 * 1024 * 1024),
            "각 파일은 10MB 이하여야 합니다."
          )
          .refine(
            (files) =>
              files.every((f) =>
                ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
                  f.type
                )
              ),
            "JPG, PNG, WEBP 파일만 업로드 가능합니다."
          ),
      })
      .refine(
        (data) => data.existing.length + data.newFiles.length >= 1,
        { message: "최소 1장의 썸네일 이미지를 추가해주세요." }
      )
      .refine(
        (data) => data.existing.length + data.newFiles.length <= 10,
        { message: "썸네일은 최대 10장까지 업로드 가능합니다." }
      ),

    // 갤러리 이미지 검증 (업로드 전)
    galleryImages: z.array(
      z
        .object({
          categoryId: z.string(),
          categoryName: z.string(),
          existing: z.array(z.string().url("유효한 URL이어야 합니다.")),
          newFiles: z
            .array(z.instanceof(File))
            .refine(
              (files) => files.every((f) => f.size <= 10 * 1024 * 1024),
              "각 파일은 10MB 이하여야 합니다."
            )
            .refine(
              (files) =>
                files.every((f) =>
                  [
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "image/jpg",
                  ].includes(f.type)
                ),
              "JPG, PNG, WEBP 파일만 업로드 가능합니다."
            ),
        })
        .superRefine((data, ctx) => {
          const totalImages = data.existing.length + data.newFiles.length;

          // 이름이 있으면 이미지도 있어야 함
          if (data.categoryName && totalImages === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `'${data.categoryName}' 카테고리에 이미지를 1개 이상 추가해주세요.`,
            });
          }

          // 이미지가 있으면 이름도 있어야 함
          if (totalImages > 0 && !data.categoryName) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "이미지가 추가된 갤러리의 카테고리 이름을 입력해주세요.",
            });
          }
        })
    ),
  });

export type CoupleInfoClientDto = z.infer<typeof coupleInfoClientSchema>;
