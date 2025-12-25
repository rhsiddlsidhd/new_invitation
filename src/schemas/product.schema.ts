import z from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "상품명을 입력해주세요."),
  description: z.string().min(10, "상품 설명은 최소 10자 이상이어야 합니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  price: z.coerce.number().min(0, "가격은 0 이상이어야 합니다."),
  isPremium: z.coerce.boolean(),
  options: z.array(z.string()),
  feature: z.coerce.boolean(),
  priority: z.coerce.number(),
  status: z.enum(["active", "inactive", "soldOut"]).optional(),
});
