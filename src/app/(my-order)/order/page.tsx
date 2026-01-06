import { Badge } from "@/components/atoms/Badge/Badge";
import { Btn } from "@/components/atoms/Btn/Btn";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import Thumbnail from "@/components/atoms/Thumbnail";
import { getCookie } from "@/lib/cookies/get";
import { decrypt } from "@/lib/token";
import { getOrdersByUserId } from "@/services/order.service";
import { Edit, RefreshCw, Star, EllipsisVertical } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { IOrder } from "@/models/order.model";

type OrderStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

// const getStatusStyle = (status: OrderStatus) => {
//   switch (status) {
//     case "COMPLETED":
//       return {
//         text: "제작완료",
//         color: "bg-green-500/10 text-green-600 border-green-500/20",
//       };
//     case "CONFIRMED":
//       return {
//         text: "결제완료",
//         color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
//       };
//     case "PENDING":
//       return {
//         text: "주문대기",
//         color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
//       };
//     case "CANCELLED":
//       return {
//         text: "취소",
//         color: "bg-red-500/10 text-red-600 border-red-500/20",
//       };
//     default:
//       return { text: "알수없음", color: "" };
//   }
// };

const PAYMENT_STATUS: Record<OrderStatus, string> = {
  PENDING: "주문대기",
  CONFIRMED: "결제완료",
  COMPLETED: "제작완료",
  CANCELLED: "취소",
};

// Group orders by date
const groupOrdersByDate = (orders: IOrder[]) => {
  const grouped: Record<string, IOrder[]> = {};

  orders.forEach((order) => {
    const dateKey = format(new Date(order.createdAt), "yyyy-MM-dd");
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(order);
  });

  return Object.entries(grouped).sort(([dateA], [dateB]) =>
    dateB.localeCompare(dateA),
  );
};

const Page = async () => {
  const cookie = await getCookie("token");
  if (!cookie) return redirect("/login");
  const { payload } = await decrypt({ token: cookie.value, type: "REFRESH" });

  if (!payload.id) return redirect("/login");
  const orders = await getOrdersByUserId(payload.id);

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground mb-2 text-3xl font-bold">주문 목록</h1>
        <p className="text-muted-foreground">
          구매한 템플릿과 주문 상태를 확인합니다.
        </p>
      </div>

      <div className="space-y-4">
        {groupedOrders.map(([date, dateOrders]) => (
          <Card key={date}>
            <CardHeader>
              <CardTitle className="text-lg">
                {format(new Date(date), "yyyy년 MM월 dd일")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dateOrders.map((order) => {
                const product = order.product;
                const hasDiscount =
                  order.discountRate > 0 || order.discountAmount > 0;

                return (
                  <div
                    key={order._id.toString()}
                    className="border-border flex items-start justify-between gap-6 rounded-lg border p-4"
                  >
                    {/* Left Side - Details */}
                    <div className="flex min-w-0 flex-1 flex-col gap-4">
                      <div className="flex justify-between text-2xl font-bold">
                        <div className="flex items-center gap-4">
                          <p>{PAYMENT_STATUS[order.orderStatus]}</p>
                          <p className="text-muted-foreground text-xs">
                            {order.merchantUid}
                          </p>
                        </div>
                        <Btn size="sm" variant="ghost">
                          <EllipsisVertical className="h-4 w-4" />
                        </Btn>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                          <Thumbnail
                            src={product.thumbnail ?? "#"}
                            alt={product.title}
                            widthPx={128}
                          />
                        </div>

                        <div className="min-w-0 flex-1 space-y-2">
                          {/* Title and Status */}
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-foreground text-base font-semibold">
                              {product.title}
                            </h3>
                          </div>

                          {/* Order Info */}
                          {/* <div className="text-muted-foreground space-y-1 text-sm">
                            <p>수량: {product.quantity}개</p>
                            <p>
                              결제수단: {order.payMethod === "CARD" && "카드"}
                              {order.payMethod === "TRANSFER" && "계좌이체"}
                              {order.payMethod === "VIRTUAL_ACCOUNT" &&
                                "가상계좌"}
                              {order.payMethod === "MOBILE" && "휴대폰"}
                            </p>

                         
                            {product.selectedFeatures.length > 0 && (
                              <div>
                                <span className="font-medium">옵션: </span>
                                {product.selectedFeatures
                                  .map((f) => f.label)
                                  .join(", ")}
                              </div>
                            )}
                          </div> */}

                          {/* Price */}
                          <div className="pt-2">
                            {hasDiscount && (
                              <div className="mb-1 text-xs text-red-500">
                                {order.discountRate > 0 &&
                                  `${Math.round(order.discountRate * 100)}% 할인`}
                                {order.discountAmount > 0 &&
                                  ` -${order.discountAmount.toLocaleString()}원`}
                              </div>
                            )}
                            <p className="text-muted-foreground text-md">
                              {order.finalPrice.toLocaleString()}원{" "}
                              {product.quantity}개
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Actions */}
                    <div className="flex shrink-0 flex-col gap-2">
                      <Btn size="lg" variant="outline" asChild>
                        <Link
                          href={`/order/edit?q=${order.coupleInfoId.toString()}`}
                        >
                          <Edit className="mr-1 h-4 w-4" />
                          수정하기
                        </Link>
                      </Btn>
                      {order.orderStatus === "CONFIRMED" && (
                        <Btn size="lg" variant="outline">
                          <RefreshCw className="mr-1 h-4 w-4" />
                          환불신청
                        </Btn>
                      )}
                      {order.orderStatus === "COMPLETED" && (
                        <Btn size="lg" variant="default">
                          <Star className="mr-1 h-4 w-4" />
                          리뷰
                        </Btn>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
