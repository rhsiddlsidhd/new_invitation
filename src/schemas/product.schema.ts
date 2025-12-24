import z from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "상품명을 입력해주세요."),
  description: z.string().min(10, "상품 설명은 최소 10자 이상이어야 합니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  price: z.number().min(0, "가격은 0 이상이어야 합니다."),
  isPremium: z.boolean(),
  options: z.array(z.string()),
  feature: z.boolean(),
  priority: z.number(),
  status: z.enum(["active", "inactive", "soldOut"]).optional(),
});
