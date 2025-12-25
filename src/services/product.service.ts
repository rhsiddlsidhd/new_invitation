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
): Promise<Product | null> => {
  await dbConnect();
  // findById 대신 findOne을 사용하여 _id와 deletedAt을 동시에 체크합니다.
  const product = await ProductModel.findOne({
    _id: productId,
    deletedAt: null, // 삭제되지 않은 상품만 조회
  });

  return product ? product.toJSON() : null;
};

export const getAllProductsService = async (): Promise<Product[]> => {
  await dbConnect();
  const products = await ProductModel.find({ deletedAt: null });

  return products.map((product) => product.toJSON());
};

export const updateProductService = async (
  productId: string,
  data: Partial<Product>,
) => {
  await dbConnect();
  // 업데이트 시에도 삭제되지 않은 문서인지 확인하기 위해 findOneAndUpdate에 조건을 추가합니다.
  const updatedProduct = await ProductModel.findOneAndUpdate(
    { _id: productId, deletedAt: null },
    { ...data },
    { new: true },
  );

  if (!updatedProduct) {
    throw new Error("상품을 찾을 수 없거나 이미 삭제된 상태입니다.");
  }

  return updatedProduct.toJSON();
};

export const deleteProductService = async (productId: string) => {
  await dbConnect();
  // 이미 삭제된 상품을 중복 삭제(날짜 갱신)하지 않도록 필터링을 추가하는 것이 안전합니다.
  const deletedProduct = await ProductModel.findOneAndUpdate(
    { _id: productId, deletedAt: null },
    { deletedAt: new Date() },
    { new: true },
  );

  if (!deletedProduct) {
    throw new Error("상품이 존재하지 않거나 이미 삭제되었습니다.");
  }

  return deletedProduct.toJSON();
};
