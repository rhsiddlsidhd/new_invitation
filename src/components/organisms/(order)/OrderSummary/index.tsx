"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";

import { CheckoutProductData, SelectedOption } from "@/types/checkout"; // Import CheckoutProductData
import { formatPriceWithComma } from "@/utils/price";
import Thumbnail from "@/components/atoms/Thumbnail";
import { DELIVERY_FEE } from "@/contants/price";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function OrderSummary() {
  // Assuming delivery fee is fixed or calculated elsewhere

  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutProductData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedItems = sessionStorage.getItem("checkoutItems");
      if (storedItems) {
        const items: CheckoutProductData[] = JSON.parse(storedItems);
        // Assuming we only handle one item at a time for this flow
        if (items.length > 0) {
          setCheckoutData(items[0]);
        } else {
          // No items in sessionStorage, redirect
          alert("주문할 상품 정보가 없습니다. 상품 선택 페이지로 이동합니다.");
          router.replace("/products");
        }
      } else {
        // No checkoutItems found, redirect
        alert("주문할 상품 정보가 없습니다. 상품 선택 페이지로 이동합니다.");
        router.replace("/products");
      }
    } catch (error) {
      console.error(
        "Failed to load checkout items from sessionStorage:",
        error,
      );
      alert(
        "주문 정보를 불러오는 데 실패했습니다. 상품 선택 페이지로 이동합니다.",
      );
      router.replace("/products");
    } finally {
      setLoading(false);
    }
    // Clean up sessionStorage after loading (optional, depending on desired persistence)
    // sessionStorage.removeItem("checkoutItems");
  }, [router]);

  if (loading) {
    return (
      <main className="bg-background flex min-h-screen items-center justify-center">
        <p>주문 정보를 불러오는 중...</p>
      </main>
    );
  }

  if (!checkoutData) {
    // This state should ideally be prevented by the redirects above,
    // but added for robustness.
    return (
      <main className="bg-background flex min-h-screen items-center justify-center">
        <p>상품 정보를 찾을 수 없습니다.</p>
      </main>
    );
  }

  const order = {
    _id: checkoutData._id,
    title: checkoutData.title,
    originalPrice: checkoutData.originalPrice,
    thumbnail: checkoutData.thumbnail,
    totalPrice: checkoutData.totalPrice,
    selectedOptionPrice: checkoutData.selectedOptionPrice,
    selectedOptions: checkoutData.selectedOptions,
    quantity: checkoutData.quantity,
  };

  const total = order.totalPrice + DELIVERY_FEE;
  return (
    <div className="lg:sticky lg:top-24">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>주문 내역</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Product */}
          <div className="flex gap-4">
            <div className="bg-muted relative h-24 w-20 shrink-0 overflow-hidden rounded-lg">
              <Thumbnail src={order.thumbnail} widthPx={80} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-foreground mb-1 truncate font-medium">
                {order.title}
              </h3>
              <p className="text-muted-foreground text-sm">청첩장 템플릿</p>
              <p className="text-foreground mt-2 text-sm font-semibold">
                {formatPriceWithComma(order.originalPrice)}원
              </p>
            </div>
          </div>

          {/* Selected Options */}
          {order.selectedOptions && order.selectedOptions.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-medium">선택 옵션:</p>
              {order.selectedOptions.map((option: SelectedOption) => (
                <div key={option._id} className="flex justify-between text-xs">
                  <span className="text-muted-foreground ml-2">
                    - {option.label}
                  </span>
                  <span className="text-foreground">
                    +{formatPriceWithComma(option.price)}원
                  </span>
                </div>
              ))}
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-muted-foreground">옵션 총액</span>
                <span className="text-foreground">
                  +{formatPriceWithComma(order.selectedOptionPrice)}원
                </span>
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">수량</span>
            <span className="text-foreground">{order.quantity}개</span>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">상품 기본 금액</span>
              <span className="text-foreground">
                {formatPriceWithComma(order.originalPrice)}원
              </span>
            </div>
            {order.selectedOptionPrice > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">옵션 금액</span>
                <span className="text-foreground">
                  +{formatPriceWithComma(order.selectedOptionPrice)}원
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">배송비</span>
              <span className="text-foreground">
                {DELIVERY_FEE === 0 ? "무료" : `${DELIVERY_FEE}원`}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-foreground text-lg font-semibold">
              총 결제금액
            </span>
            <span className="text-primary text-2xl font-bold">
              {formatPriceWithComma(total)}원{" "}
              {/* Display the final calculated price */}
            </span>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/50 flex-col items-start gap-3">
          <div className="flex items-start gap-2">
            <div className="bg-muted-foreground mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
            <p className="text-muted-foreground text-xs leading-relaxed">
              구매 후 즉시 다운로드 링크가 이메일로 발송됩니다.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-muted-foreground mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
            <p className="text-muted-foreground text-xs leading-relaxed">
              디지털 상품 특성상 구매 후 환불이 불가합니다.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-muted-foreground mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
            <p className="text-muted-foreground text-xs leading-relaxed">
              평생 무료 호스팅이 제공됩니다.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
