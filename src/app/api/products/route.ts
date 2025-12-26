import { apiError, APIRouteResponse, apiSuccess } from "@/api/response";
import { getAllProductsService, Product } from "@/services/product.service";

export const GET = async (): Promise<APIRouteResponse<Product[]>> => {
  try {
    const products = await getAllProductsService();
    return apiSuccess(products);
  } catch (error) {
    return apiError(error);
  }
};
