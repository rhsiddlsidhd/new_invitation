import { apiError, apiSuccess, APIRouteResponse } from "@/api/response";
import {
  getAllPremiumFeatureService,
  PremiumFeature,
} from "@/services/premiumFeature.service";

export const GET = async (): Promise<
  APIRouteResponse<{ features: PremiumFeature[] }>
> => {
  try {
    const features = await getAllPremiumFeatureService();

    return apiSuccess({ features: features ?? [] });
  } catch (error) {
    return apiError(error);
  }
};
