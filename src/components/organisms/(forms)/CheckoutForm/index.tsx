"use client";

import type React from "react";
import PortOne from "@portone/browser-sdk/v2";
import { startTransition, useActionState, useEffect, useState } from "react";
import { PayStatus } from "@/models/payment"; // Import PayMethod
import { z } from "zod";

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

import { generateUid } from "@/utils/id";
import { fetcher } from "@/api/fetcher";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { toast } from "sonner";
import { CheckoutProductData, SelectedOption } from "@/types/checkout";
import { validateAndFlatten } from "@/lib/validation";
import { createOrderAction } from "@/actions/createOrderAction";
import { useRouter } from "next/navigation";
import { OrderFeatureSnapshot } from "@/models/order.model";

const storeId = process.env.NEXT_PUBLIC_POST_ONE_STORE_ID;

const channelKey = process.env.NEXT_PUBLIC_POST_ONE_CHANNELKEY;

const BuyerInfoSchema = z.object({
  buyerName: z.string().min(2, { message: "이름은 2자 이상 입력해주세요." }),
  buyerEmail: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  buyerPhone: z.string().regex(/^\d{3}-\d{3,4}-\d{4}$/, {
    message: "연락처 형식이 올바르지 않습니다. (예: 010-1234-5678)",
  }),
});

type BuyerInfo = z.infer<typeof BuyerInfoSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const [stste, action, pending] = useActionState(createOrderAction, null);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BuyerInfo, string[]>>
  >({});
  const [paymentStatus, setPaymentStatus] = useState<PayStatus | "IDLE">(
    "IDLE",
  );

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // 이전 에러 초기화

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // 세션 스토리지에서 상품 정보 가져오기
    const store = sessionStorage.getItem("checkoutItems");
    if (!store) {
      toast.error("주문 정보를 찾을 수 없습니다. 다시 시도해주세요.");
      return;
    }
    const item = JSON.parse(store) as CheckoutProductData;

    // 폼 데이터 유효성 검사
    const BuyerData = {
      buyerName: formData.get("buyerName") as string,
      buyerEmail: formData.get("buyerEmail") as string,
      buyerPhone: formData.get("buyerPhone") as string,
    };
    const parsed = validateAndFlatten<BuyerInfo>(BuyerInfoSchema, BuyerData);

    if (!parsed.success) {
      setErrors(parsed.error);
      return;
    }
    console.log("buyer", parsed);
    // 유효성 검사를 통과한 데이터와 상품 정보를 formData에 추가
    const { _id, selectedOptions, totalPrice, originalPrice } = item;
    formData.append("productId", _id);
    formData.append("finalPrice", String(totalPrice));
    formData.append("originalPrice", String(originalPrice));
    formData.append("selectedOptions", JSON.stringify(selectedOptions ?? []));

    toast.info("데이터가 준비되었습니다. 다음 단계에서 서버로 전송됩니다.");

    startTransition(() => action(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hidden input to ensure payMethod is always part of formData */}

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
      <PaymentMethodSelector />
      {/* <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
              2
            </span>
            결제 수단
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value as PayMethod)}
            className="space-y-2"
          >
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  className="border-muted hover:border-muted-foreground/30 hover:bg-accent/50 has-checked:border-primary has-checked:bg-primary/5 flex items-center gap-3 rounded-lg border px-4 py-3 transition-all has-checked:shadow-sm"
                >
                  <RadioGroupItem value={method.value} id={method.id} />
                  <Icon className="text-muted-foreground h-5 w-5" />
                  <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                    <span className="text-sm font-medium">{method.title}</span>
                    <span className="text-muted-foreground/80 ml-2 text-xs">
                      {method.description}
                    </span>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card> */}

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
            <Btn type="submit" size="lg" className="flex-1" disabled={!agreed}>
              <Save className="mr-2 h-5 w-5" />
              결제하기
            </Btn>
          </div>
        </div>
      </div>
    </form>
  );
}
