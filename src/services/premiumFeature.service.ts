import { FeatureModel } from "@/models/product.feature.model";
import { premiumFeatureSchema } from "@/schemas/premiumFeature.schema";
import { dbConnect } from "@/shared/utils/mongodb";
import mongoose from "mongoose";
import z from "zod";

interface PremiumFeatureRaw {
  code: string;
  label: string;
  description: string;
  additionalPrice: number;
  isActive: boolean;
  createdAt: Date;
  _id: mongoose.Types.ObjectId;
}

export type PremiumFeature = Omit<PremiumFeatureRaw, "_id" | "createdAt"> & {
  _id: string;
  createdAt: string;
};

export const createPremiumFeatureService = async (
  data: z.infer<typeof premiumFeatureSchema>,
) => {
  await dbConnect();
  const newFeatureModel = await new FeatureModel(data).save();
  return newFeatureModel;
};

export const getAllPremiumFeatureService = async (): Promise<
  PremiumFeature[]
> => {
  await dbConnect();
  const features = await FeatureModel.find()
    .select("-__v -updatedAt")
    .lean<PremiumFeatureRaw[]>();

  return features.map((f) => ({
    ...f,
    _id: f._id.toString(),
    createdAt: f.createdAt.toISOString(),
  }));
};

export const updatePremiumFeatureService = async (
  id: string,
  data: z.infer<typeof premiumFeatureSchema>,
) => {
  await dbConnect();

  const updatedFeature = await FeatureModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );

  return updatedFeature;
};
