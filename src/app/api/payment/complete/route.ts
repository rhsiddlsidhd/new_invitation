import { apiError } from "@/api/response";
import { HTTPError } from "@/api/type";
import { syncPayment } from "@/services/payment.service";
import { NextRequest, NextResponse } from "next/server";
import { PayStatus } from "@/models/payment";
import { APIRouteResponse } from "@/api/response";
import { decrypt } from "@/lib/token";

export const POST = async (
  req: NextRequest,
): Promise<APIRouteResponse<{ status: PayStatus }>> => {
  try {
    // 인증 확인 - Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("[Payment Complete] No auth header");
      throw new HTTPError("로그인이 필요합니다.", 401, undefined, "/login");
    }

    const token = authHeader.substring(7); // "Bearer " 제거

    let payload;
    try {
      const result = await decrypt({ token, type: "ACCESS" });
      payload = result.payload;

      if (!payload.id) {
        console.error("[Payment Complete] No payload.id");
        throw new HTTPError("유효하지 않은 토큰입니다.", 401, undefined, "/login");
      }
    } catch (decryptError) {
      console.error("[Payment Complete] Decrypt failed:", decryptError);
      throw new HTTPError("유효하지 않은 토큰입니다.", 401, undefined, "/login");
    }

    const body = await req.json();
    const { paymentId } = body;

    if (typeof paymentId !== "string") {
      throw new HTTPError("올바르지 않은 요청입니다.", 400);
    }

    const payment = await syncPayment(paymentId);

    if (!payment) {
      throw new HTTPError("결제 동기화에 실패했습니다.", 500);
    }

    return NextResponse.json(
      {
        success: true,
        data: { status: payment.status },
      },
      { status: 200 },
    );
  } catch (error) {
    return apiError(error);
  }
};
