import { PAY_METHOD_VALUES } from "@/contants/payment";
import z from "zod";

const SelectedOptionSchema = z.object({
  featureId: z.string().min(1, "옵션 ID가 필요합니다."),
  label: z.string().min(1, "옵션 이름이 필요합니다."),
  price: z.number().min(0, "가격은 0 이상이어야 합니다."),
  code: z.string().min(1, "옵션 코드가 필요합니다."),
});

export const createOrderSchema = z.object({
  buyerName: z.string().min(2, { message: "이름은 2자 이상 입력해주세요." }),
  buyerEmail: z.email({ message: "유효한 이메일을 입력해주세요." }),
  buyerPhone: z.string().regex(/^\d{3}-\d{3,4}-\d{4}$/, {
    message: "연락처 형식이 올바르지 않습니다. (예: 010-1234-5678)",
  }),
  productId: z.string().min(1, "상품 ID가 필요합니다."),
  originalPrice: z.number().positive("가격은 양수여야 합니다."),
  finalPrice: z.number().positive("총 가격은 양수여야 합니다."),
  selectedFeatures: z.array(SelectedOptionSchema),
  payMethod: z.enum(PAY_METHOD_VALUES, {
    message: "결제 수단을 선택해주세요.",
  }),
});
