import { BaseProduct, ProductModel } from "@/models/product.model";

import { dbConnect } from "@/shared/utils/mongodb";
import mongoose from "mongoose";

type ProductInput = Omit<BaseProduct, "options"> & { options: string[] | [] };

// toJSON() 후의 실제 타입 (ObjectId가 string으로 변환됨)
export type Product = {
  _id: string;
  authorId: string;
  title: string;
  description: string;
  thumbnail: string;
  previewUrl?: string;
  price: number;
  category: string;
  isPremium: boolean;
  options?: string[]; // toJSON()에서 ObjectId[] -> string[]로 변환됨
  feature: boolean;
  priority: number;
  likes: number;
  views: number;
  salesCount: number;
  status: "active" | "inactive" | "soldOut";
};

export const createProductService = async (data: ProductInput) => {
  try {
    await dbConnect();

    const newProduct = await new ProductModel({
      ...data,
      options: data.options.map((value) => new mongoose.Types.ObjectId(value)),
    }).save();

    return newProduct.toJSON();
  } catch (error) {
    console.error("Failed to create product:", error);
    throw new Error("상품 생성에 실패했습니다.");
  }
};

export const getProductService = async (
  productId: string,
): Promise<Product> => {
  await dbConnect();
  const product = await ProductModel.findById(productId);

  return product.toJSON();
};

export const getAllProductsService = async (): Promise<Product[]> => {
  await dbConnect();
  const products = await ProductModel.find({});

  return products.map((product) => product.toJSON());
};

export const updateProductService = async (
  productId: string,
  data: Partial<Product>,
) => {
  await dbConnect();
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    {
      ...data,
    },
    { new: true },
  );

  return updatedProduct.toJSON();
};

export const deleteProductService = async (productId: string) => {
  await dbConnect();
  const deletedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    { deletedAt: new Date() },
    { new: true },
  );

  return deletedProduct.toJSON();
};
