import { apiError, apiSuccess, APIRouteResponse } from "@/api/response";
import {
  getAllPremiumFeatureService,
  PremiumFeature,
} from "@/services/premiumFeature.service";

export const GET = async (): Promise<APIRouteResponse<PremiumFeature[]>> => {
  try {
    const data = await getAllPremiumFeatureService();

    return apiSuccess(data ?? []);
  } catch (error) {
    return apiError(error);
  }
};
