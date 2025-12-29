import { apiError, APIRouteResponse, apiSuccess } from "@/api/response";
import { HTTPError } from "@/api/type";
import { getCookie } from "@/lib/cookies/get";
import { decrypt } from "@/lib/token";
import { updateProductLikeService } from "@/services/product.service";

import { NextRequest } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<APIRouteResponse<{ message: string }>> => {
  try {
    const cookie = await getCookie("token");
    const { id } = await params;

    if (!cookie)
      throw new HTTPError("접근 권한이 없습니다. 로그인 후 이용해주세요.", 401);

    const res = await decrypt({ token: cookie.value, type: "REFRESH" });

    if (!res.payload.id)
      throw new HTTPError("접근 권한이 없습니다. 로그인 후 이용해주세요.", 401);
    const updated = await updateProductLikeService(id, res.payload.id);
    if (!updated)
      throw new HTTPError(
        "상품을 찾을 수 없거나 좋아요 업데이트에 실패했습니다.",
        404,
      );

    return apiSuccess({ message: "좋아요 업데이트에 성공하였습니다." });
  } catch (error) {
    return apiError(error);
  }
};
