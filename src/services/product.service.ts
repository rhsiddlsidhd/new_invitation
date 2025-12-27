import { BaseProduct, ProductModel } from "@/models/product.model";

import { dbConnect } from "@/shared/utils/mongodb";

import mongoose from "mongoose";

type ProductInput = Omit<BaseProduct, "options"> & { options: string[] | [] };

export type Product = Omit<ProductModel, "options" | "createdAt"> & {
  options: string[];
  _id: string;
  createdAt: string;
};

export const createProductService = async (data: ProductInput) => {
  await dbConnect();

  const newProduct = await new ProductModel({
    ...data,
    options: data.options.map((value) => new mongoose.Types.ObjectId(value)),
  }).save();

  return newProduct.toJSON();
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
  data: Partial<ProductInput>,
) => {
  await dbConnect();

  const updateData = {
    ...data,
    options: data.options
      ? data.options.map((value) => new mongoose.Types.ObjectId(value))
      : undefined,
  };

  // 업데이트 시에도 삭제되지 않은 문서인지 확인하기 위해 findOneAndUpdate에 조건을 추가합니다.
  const updatedProduct = await ProductModel.findOneAndUpdate(
    { _id: productId, deletedAt: null },
    updateData,
    { new: true },
  );

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

  return deletedProduct.toJSON();
};
