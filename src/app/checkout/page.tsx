"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutForm } from "@/components/organisms/(forms)/CheckoutForm";
import { OrderSummary } from "@/components/organisms/(order)/OrderSummary";
import { CheckoutProductData } from "@/types/checkout"; // Import the CheckoutProductData type

export default function CheckoutPage() {
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

  // Map CheckoutProductData to the expected OrderSummaryProps if necessary
  // Assuming OrderSummary expects an 'order' prop that matches some fields of CheckoutProductData
  const orderSummaryProps = {
    _id: checkoutData._id,
    title: checkoutData.title,
    originalPrice: checkoutData.originalPrice,
    thumbnail: checkoutData.thumbnail,
    totalPrice: checkoutData.totalPrice, // Pass the total calculated price
    // You might need to add selectedOptions and quantity to OrderSummary component's props
    // if it needs to display those details.
    selectedOptionPrice: checkoutData.selectedOptionPrice,
    selectedOptions: checkoutData.selectedOptions,
    quantity: checkoutData.quantity,
  };

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">
              결제하기
            </h1>
            <p className="text-muted-foreground">
              안전하고 빠른 결제를 진행해주세요
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left side - Checkout Form */}
            <div className="lg:col-span-2">
              <CheckoutForm />
            </div>

            {/* Right side - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
