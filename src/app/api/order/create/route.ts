import { apiError } from "@/api/response";
import { HTTPError } from "@/api/type";
import { NextRequest, NextResponse } from "next/server";
import { APIRouteResponse } from "@/api/response";
import { z } from "zod";
import { validateAndFlatten } from "@/lib/validation";
import { decrypt } from "@/lib/token";

const createOrderRequestSchema = z.object({
  productId: z.string().min(1, { message: "상품 ID가 필요합니다." }),
  originalPrice: z.number().positive({ message: "가격은 양수여야 합니다." }),
  selectedOptions: z.array(
    z.object({
      _id: z.string(),
      label: z.string(),
      price: z.number(),
    }),
  ),
  totalPrice: z.number().positive({ message: "총 가격은 양수여야 합니다." }),
  buyerName: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
  buyerEmail: z.string().email({ message: "유효한 이메일이어야 합니다." }),
  buyerTel: z.string().regex(/^\d{3}-\d{3,4}-\d{4}$/, {
    message: "연락처 형식이 올바르지 않습니다.",
  }),
});

type CreateOrderRequest = z.infer<typeof createOrderRequestSchema>;

export const POST = async (
  req: NextRequest,
): Promise<APIRouteResponse<{ merchantUid: string; orderId: string }>> => {
  try {
    // 인증 확인 - Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("[Order Create] No auth header");
      throw new HTTPError("로그인이 필요합니다.", 401, undefined, "/login");
    }

    const token = authHeader.substring(7); // "Bearer " 제거

    let payload;
    try {
      const result = await decrypt({ token, type: "ACCESS" });
      payload = result.payload;

      if (!payload.id) {
        console.error("[Order Create] No payload.id");
        throw new HTTPError(
          "유효하지 않은 토큰입니다.",
          401,
          undefined,
          "/login",
        );
      }
    } catch (decryptError) {
      console.error("[Order Create] Decrypt failed:", decryptError);
      throw new HTTPError(
        "유효하지 않은 토큰입니다.",
        401,
        undefined,
        "/login",
      );
    }

    const body = await req.json();

    // 유효성 검사
    const parsed = validateAndFlatten<CreateOrderRequest>(
      createOrderRequestSchema,
      body,
    );

    if (!parsed.success) {
      throw new HTTPError("입력값을 확인해주세요", 400, parsed.error);
    }

    const {
      productId,
      originalPrice,
      selectedOptions,
      totalPrice,
      buyerName,
      buyerEmail,
      buyerTel,
    } = parsed.data;

    // Order + Payment 생성
    const { order, payment } = await createOrderAndPaymentService({
      userId: payload.id,
      productId,
      originalPrice,
      finalPrice: totalPrice,
      selectedOptions,
      buyerName,
      buyerEmail,
      buyerTel,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          merchantUid: payment.merchantUid,
          orderId: order._id.toString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return apiError(error);
  }
};
