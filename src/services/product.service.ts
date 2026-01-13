import {
  ProductDocument,
  ProductModel,
  ProductJSON,
  Status,
  Category,
} from "@/models/product.model";
import { dbConnect } from "@/utils/mongodb";
import mongoose from "mongoose";

// Product 타입을 export (다른 파일에서 사용)
export type Product = ProductJSON;

// 상품 생성/수정 시 입력 타입
interface ProductInput {
  authorId: string;
  title: string;
  description: string;
  thumbnail: string;
  previewUrl?: string;
  price: number;
  category: Category;
  isPremium: boolean;
  options?: string[];
  feature: boolean;
  priority: number;
  status?: Status;
}

// 상품생성
export const createProductService = async (
  data: ProductInput,
): Promise<boolean> => {
  await dbConnect();

  const newProduct = await new ProductModel({
    ...data,
    status: data.status || "active",
    options:
      data.isPremium && data.options
        ? data.options.map((value) => new mongoose.Types.ObjectId(value))
        : [],
  }).save();

  return !!newProduct;
};

// 단일 상품 조회
export const getProductService = async (
  productId: string,
): Promise<ProductJSON | null> => {
  await dbConnect();

  const product = await ProductModel.findOne({
    _id: productId,
    deletedAt: null,
  });

  return product ? (product.toJSON() as ProductJSON) : null;
};

// 모든 상품 조회
export const getAllProductsService = async (): Promise<ProductJSON[]> => {
  await dbConnect();
  const products = await ProductModel.find({ deletedAt: null }).sort({
    createdAt: -1,
  });

  return products.map((product) => product.toJSON() as ProductJSON);
};

// 상품 업데이트
export const updateProductService = async (
  productId: string,
  data: Partial<ProductInput>,
): Promise<ProductJSON | null> => {
  await dbConnect();

  const updateData = {
    ...data,
    options:
      data.isPremium && data.options
        ? data.options.map((value) => new mongoose.Types.ObjectId(value))
        : [],
  };

  const updatedProduct = await ProductModel.findOneAndUpdate(
    { _id: productId, deletedAt: null },
    updateData,
    { new: true },
  );

  return updatedProduct ? updatedProduct.toJSON() : null;
};

// 상품 삭제
export const deleteProductService = async (
  productId: string,
): Promise<boolean> => {
  await dbConnect();

  const deletedProduct = await ProductModel.findOneAndUpdate(
    { _id: productId, deletedAt: null },
    { deletedAt: new Date() },
    { new: true },
  );

  return !!deletedProduct;
};

// 상품 좋아요 업데이트
export const updateProductLikeService = async (
  productId: string,
  userId: string,
): Promise<boolean> => {
  await dbConnect();

  const userObjectId = new mongoose.Types.ObjectId(userId);

  const product = await ProductModel.findOne({
    _id: productId,
    deletedAt: null,
  });

  if (!product) return false;

  const hasLiked = product.likes.some((id) => id.equals(userObjectId));

  const updated = await ProductModel.findOneAndUpdate(
    { _id: productId, deletedAt: null },
    hasLiked
      ? { $pull: { likes: userObjectId } }
      : { $addToSet: { likes: userObjectId } },
    { new: true },
  );

  return !!updated;
};
