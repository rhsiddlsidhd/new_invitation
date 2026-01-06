"use client";

import type React from "react";
import PortOne, { PaymentResponse } from "@portone/browser-sdk/v2";
import { startTransition, useActionState, useEffect, useState } from "react";
import { PayStatus } from "@/models/payment";

import { Save } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";

import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Label } from "@/components/atoms/Label/Label";
import LabeledInput from "@/components/molecules/(input-group)/LabeledInput";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { toast } from "sonner";
import { CheckoutProductData } from "@/types/checkout";
import { validateAndFlatten } from "@/lib/validation";
import { createOrderAction } from "@/actions/createOrderAction";
import { useRouter } from "next/navigation";
import { fetcher } from "@/api/fetcher";
import Spinner from "@/components/atoms/Spinner/Spinner";
import { BuyerInfo, BuyerInfoSchema } from "@/schemas/order.schema";

const storeId = process.env.NEXT_PUBLIC_POST_ONE_STORE_ID;

const channelKey = process.env.NEXT_PUBLIC_POST_ONE_CHANNELKEY;

export function CheckoutForm({ query }: { query: string }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(createOrderAction, null);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BuyerInfo, string[]>>
  >({});
  const [paymentStatus, setPaymentStatus] = useState<PayStatus | "IDLE">(
    "IDLE",
  );

  const completeResponse = async (payment: PaymentResponse | undefined) => {
    if (!payment?.paymentId) {
      console.error("Payment ID is missing");
      return;
    }

    try {
      const data = await fetcher<{ status: PayStatus }>(
        "/api/payment/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: payment.paymentId,
          }),
        },
        { auth: true },
      );

      setPaymentStatus(data.status);

      return data;
    } catch (error) {
      setPaymentStatus("FAILED");
      toast.error("결제 검증에 실패했습니다. 고객센터에 문의해주세요.");
      throw error;
    }
  };

  useEffect(() => {
    if (!storeId || !channelKey) return;

    const handlePortOne = async () => {
      if (!state || !state.success) {
        console.error("stateError", state?.error);
        return;
      }

      const {
        merchantUid,
        finalPrice,
        payMethod,
        buyerName,
        buyerEmail,
        buyerPhone,
        title,
        userId,
        productId,
      } = state.data;

      try {
        setPaymentStatus("PENDING");

        const payment = await PortOne.requestPayment({
          storeId,
          channelKey,
          paymentId: merchantUid,
          orderName: `${title} 모바일 청첩장`,
          totalAmount: finalPrice,
          currency: "CURRENCY_KRW",
          payMethod,
          customer: {
            customerId: userId,
            fullName: buyerName,
            phoneNumber: buyerPhone,
            email: buyerEmail,
          },
          customData: {
            productId,
          },
        });

        if (payment?.code !== undefined) {
          // 결제 실패
          setPaymentStatus("FAILED");
          toast.error(`결제에 실패했습니다: ${payment.message}`);
          return;
        }

        // 서버에 결제 검증 요청
        try {
          await completeResponse(payment);
          setPaymentStatus("PAID");

          // sessionStorage 정리
          sessionStorage.removeItem("checkoutItems");

          // 결제 완료 페이지로 이동
          toast.success("결제가 완료되었습니다!");
          router.push(`/payment/success?orderId=${merchantUid}`);
        } catch (completeError) {
          console.error("Payment verification error:", completeError);
          setPaymentStatus("FAILED");
          toast.error("결제 검증에 실패했습니다. 고객센터에 문의해주세요.");
        }
      } catch (error) {
        console.error("Payment error:", error);
        setPaymentStatus("FAILED");
        toast.error("결제 중 오류가 발생했습니다.");
      }
    };

    if (state && state.success) {
      handlePortOne();
    }
  }, [state, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // 이전 에러 초기화
    console.log("클릭");

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // 세션 스토리지에서 상품 정보 가져오기
    const store = sessionStorage.getItem("checkoutItems");
    if (!store) {
      toast.error("주문 정보를 찾을 수 없습니다. 다시 시도해주세요.");
      return;
    }
    const item = JSON.parse(store) as CheckoutProductData;
    console.log(item);

    // 폼 데이터 유효성 검사
    const BuyerData = {
      buyerName: formData.get("buyerName") as string,
      buyerEmail: formData.get("buyerEmail") as string,
      buyerPhone: formData.get("buyerPhone") as string,
      payMethod: formData.get("payMethod") as string,
    };
    const parsed = validateAndFlatten<BuyerInfo>(BuyerInfoSchema, BuyerData);

    if (!parsed.success) {
      setErrors(parsed.error);
      return;
    }

    const {
      _id,
      originalPrice,
      discountedPrice,
      quantity,
      selectedFeatures,
      thumbnail,
      title,
    } = item;
    formData.append("productId", _id);
    formData.append("productTitle", title);
    formData.append("productThumbnail", thumbnail);
    formData.append("productQuantity", String(quantity));
    formData.append("originalPrice", String(originalPrice));
    formData.append("discountedPrice", String(discountedPrice));
    formData.append("selectedFeatures", JSON.stringify(selectedFeatures ?? []));
    formData.append("coupleInfoId", query);

    toast.info("데이터가 준비되었습니다. 다음 단계에서 서버로 전송됩니다.");

    startTransition(() => action(formData));
  };

  return (
    <div className="relative">
      {paymentStatus === "PENDING" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-lg bg-white/80 backdrop-blur-sm">
          <Spinner />
          <p className="text-lg font-bold">결제 진행 중...</p>
          <p className="text-muted-foreground">잠시만 기다려주세요.</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 pb-24">
        {/* Customer Information */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                1
              </span>
              구매자 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <LabeledInput
                id="name"
                name="buyerName"
                type="text"
                placeholder="홍길동"
                required
                error={errors && errors.buyerName && errors.buyerName[0]}
              >
                이름 *
              </LabeledInput>

              <LabeledInput
                id="phone"
                name="buyerPhone"
                type="tel"
                placeholder="010-1234-5678"
                required
                error={errors && errors.buyerPhone && errors.buyerPhone[0]}
              >
                연락처 *
              </LabeledInput>
            </div>
            <div>
              <LabeledInput
                id="email"
                name="buyerEmail"
                type="email"
                placeholder="your@email.com"
                required
                error={errors && errors.buyerEmail && errors.buyerEmail[0]}
              >
                이메일 *
              </LabeledInput>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <PaymentMethodSelector
          error={errors && errors.payMethod && errors.payMethod[0]}
        />

        {/* Terms and Conditions */}
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <Label
                  htmlFor="terms"
                  className="cursor-pointer text-sm leading-relaxed font-normal"
                >
                  구매조건 확인 및 결제 진행에 동의합니다.
                  <br />
                  <span className="text-muted-foreground">
                    (전자상거래법 제 8조 2항) 주문 내용을 확인하였으며, 구매에
                    동의하시겠습니까?
                  </span>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="bg-background/95 border-border fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="mx-auto flex max-w-5xl gap-4">
              <Btn
                type="submit"
                size="lg"
                className="flex-1"
                disabled={!agreed || pending || paymentStatus === "PENDING"}
              >
                {pending || paymentStatus === "PENDING" ? (
                  <Spinner />
                ) : (
                  <Save className="mr-2 h-5 w-5" />
                )}
                {pending
                  ? "주문 처리 중..."
                  : paymentStatus === "PENDING"
                    ? "결제 진행 중..."
                    : "결제하기"}
              </Btn>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
