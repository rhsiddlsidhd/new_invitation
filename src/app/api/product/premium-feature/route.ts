import { apiError, apiSuccess, APIRouteResponse } from "@/api/response";
import {
  getAllPremiumFeatureService,
  PremiumFeature,
} from "@/services/premiumFeature.service";

/**
 * GET /api/product/premium-feature
 *
 * 프리미엄 기능 목록 조회 (공개 API)
 * - 관리자 페이지: 상품 편집 시 프리미엄 기능 선택
 * - 일반 사용자: 상품 목록 필터링
 *
 * @returns {success: true, data: PremiumFeature[]} - 성공 시 (빈 배열 포함)
 * @throws {HTTPError} 500 - 서버 오류
 */
export const GET = async (): Promise<APIRouteResponse<PremiumFeature[]>> => {
  try {
    const data = await getAllPremiumFeatureService();

    return apiSuccess(data ?? []);
  } catch (error) {
    return apiError(error);
  }
};
