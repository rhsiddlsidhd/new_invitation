import z from "zod";

export const productSchema = z
  .object({
    title: z.string().min(1, "상품명을 입력해주세요."),
    description: z.string().min(10, "상품 설명은 최소 10자 이상이어야 합니다."),
    category: z.enum(["modern", "romantic", "vintage", "classic", "minimal"]),
    price: z.number().min(0, "가격은 0 이상이어야 합니다."),
    isPremium: z.boolean(),
    options: z.array(z.string()).optional(),
    feature: z.boolean(),
    priority: z.number(),
    status: z.enum(["active", "inactive", "soldOut"]).optional(),
    thumbnail: z
      .instanceof(File, { message: "썸네일 이미지를 등록해주세요." })
      .refine((file) => file.size > 0, {
        message: "썸네일 이미지를 등록해주세요.",
      }),
  })
  .refine(
    (data) => {
      if (data.isPremium && data.options.length === 0) {
        return false;
      }
      return true;
    },
    {
      message: "옵션을 선택해주세요.",
      path: ["options"],
    },
  );

export type ProductDto = z.infer<typeof productSchema>;
