import { FeatureModel } from "@/models/product.feature.model";
import { premiumFeatureSchema } from "@/schemas/premiumFeature.schema";
import { dbConnect } from "@/shared/utils/mongodb";
import z from "zod";

export const createPremiumFeatureService = async (
  data: z.infer<typeof premiumFeatureSchema>,
) => {
  await dbConnect();

  const newFeatureModel = await new FeatureModel(data).save();

  return newFeatureModel;
};
