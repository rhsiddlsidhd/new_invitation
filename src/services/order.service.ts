import mongoose from "mongoose";
import { OrderModel, OrderBase, Order } from "@/models/order.model";

import { dbConnect } from "@/shared/utils/mongodb";
import { SelectedOption } from "@/types/checkout";

type CreateOrderService = Omit<OrderBase, "selectedFeatures"> & {
  selectedFeatures: SelectedOption[];
};

export const createOrderService = async (
  data: CreateOrderService,
): Promise<Order> => {
  await dbConnect();

  const selectedFeatures =
    data.selectedFeatures?.map((f) => ({
      featureId: new mongoose.Types.ObjectId(f.featureId),
      code: f.code,
      label: f.label,
      price: f.price,
    })) ?? [];
  const orderData = {
    ...data,
    selectedFeatures,
  };

  const order = await OrderModel.create(orderData);

  return order.toObject({ versionKey: false }) as Order;
};

export const getOrderSeviceByMerchantUid = async (
  merchantUid: string,
): Promise<Order> => {
  await dbConnect();

  const order = await OrderModel.findOne({ merchantUid });

  return order?.toObject({ versionKey: false }) as Order;
};
