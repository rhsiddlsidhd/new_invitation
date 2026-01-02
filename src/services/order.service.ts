import mongoose from "mongoose";
import { OrderModel, OrderFeatureSnapshot } from "@/models/order.model";
import { PaymentModel } from "@/models/payment";
import { dbConnect } from "@/shared/utils/mongodb";
import { generateUid } from "@/utils/id";
import User from "@/models/user.model";

interface CreateOrderAndPaymentParams {
  userId: string;
  productId: string;
  originalPrice: number;
  finalPrice: number;
  selectedOptions: Array<{
    _id: string;
    label: string;
    price: number;
    code: string;
  }>;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
}

export const createOrderService = async (data: CreateOrderAndPaymentParams) => {
  await dbConnect();

  console.log("service ", data);
};
