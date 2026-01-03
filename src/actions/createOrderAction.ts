"use server";

import { handleActionError } from "@/api/error";
import { APIResponse, success } from "@/api/response";
import { HTTPError } from "@/api/type";
import { redirect } from "next/navigation";

import { getCookie } from "@/lib/cookies/get";
import { decrypt } from "@/lib/token";
import { getUser } from "@/services/auth.service";
import { createOrderService } from "@/services/order.service";
import { validateAndFlatten } from "@/lib/validation";
import { createOrderSchema } from "@/schemas/order.schema";
import { generateUid } from "@/utils/id";
import mongoose from "mongoose";

export async function createOrderAction(
  prev: unknown,
  formData: FormData,
): Promise<APIResponse<{ merchantUid: string; message: string }>> {
  try {
    // 쿠키에서 Refresh Token 가져와서 사용자 검증
    const cookie = await getCookie("token");
    const refreshToken = cookie?.value;

    if (!refreshToken) {
      redirect("/login");
    }

    const { payload } = await decrypt({ token: refreshToken, type: "REFRESH" });

    if (!payload.id) {
      throw new HTTPError("유효하지 않은 토큰입니다.", 401);
    }

    const user = await getUser({ id: payload.id });

    if (!user) {
      throw new HTTPError("사용자를 찾을 수 없습니다.", 404);
    }

    // FormData에서 주문 정보 추출
    const selectedOptionsRaw = formData.get("selectedOptions") as string;

    const data = {
      buyerName: formData.get("buyerName") as string,
      buyerEmail: formData.get("buyerEmail") as string,
      buyerPhone: formData.get("buyerPhone") as string,
      productId: formData.get("productId") as string,
      originalPrice: Number(formData.get("originalPrice")),
      finalPrice: Number(formData.get("finalPrice")),
      selectedFeatures: selectedOptionsRaw
        ? JSON.parse(selectedOptionsRaw)
        : [],
    };

    // Zod 스키마로 유효성 검증
    const parsed = validateAndFlatten(createOrderSchema, data);

    if (!parsed.success) {
      throw new HTTPError("알 수 없는 오류가 발생하였습니다.", 500);
    }
    const merchantUid = generateUid("ORDER");

    // 사용자 정보에서 구매자 정보 가져오기

    const order = await createOrderService({
      ...parsed.data,
      userId: new mongoose.Types.ObjectId(user._id),
      productId: new mongoose.Types.ObjectId(parsed.data.productId),
      merchantUid,
    });

    return success({
      merchantUid: order.merchantUid,
      message: "주문이 성공적으로 생성되었습니다. 결제를 진행해주세요.",
    });
  } catch (e) {
    return handleActionError(e);
  }
}
