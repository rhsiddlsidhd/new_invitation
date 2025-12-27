"use client";

import type React from "react";

import { useState } from "react";

import { CreditCard, Building2, Smartphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import Label from "@/components/atoms/Label/Label";
import { Input } from "@/components/atoms/Input/Input";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import { Btn } from "@/components/atoms/Btn/Btn";

export function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "bank" | "mobile"
  >("card");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implement payment logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="space-y-2">
              <Label htmlFor="firstName">이름</Label>
              <Input id="firstName" placeholder="홍길동" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">연락처</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="010-1234-5678"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
              2
            </span>
            결제 수단
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`rounded-lg border-2 p-4 transition-all ${
                paymentMethod === "card"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-transparent"
              }`}
            >
              <CreditCard className="text-foreground mx-auto mb-2 h-6 w-6" />
              <span className="text-foreground text-sm font-medium">
                신용/체크카드
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("bank")}
              className={`rounded-lg border-2 p-4 transition-all ${
                paymentMethod === "bank"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-transparent"
              }`}
            >
              <Building2 className="text-foreground mx-auto mb-2 h-6 w-6" />
              <span className="text-foreground text-sm font-medium">
                계좌이체
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("mobile")}
              className={`rounded-lg border-2 p-4 transition-all ${
                paymentMethod === "mobile"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-transparent"
              }`}
            >
              <Smartphone className="text-foreground mx-auto mb-2 h-6 w-6" />
              <span className="text-foreground text-sm font-medium">
                휴대폰
              </span>
            </button>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">카드번호</Label>
                <Input
                  id="cardNumber"
                  placeholder="0000-0000-0000-0000"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">유효기간</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    type="password"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "bank" && (
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                계좌이체를 선택하신 경우, 결제 완료 후 입금 계좌 정보를 이메일로
                발송해드립니다.
              </p>
            </div>
          )}

          {paymentMethod === "mobile" && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">휴대폰 번호</Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="010-1234-5678"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carrier">통신사</Label>
                <select
                  id="carrier"
                  className="border-input bg-background text-foreground h-10 w-full rounded-md border px-3"
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="skt">SKT</option>
                  <option value="kt">KT</option>
                  <option value="lg">LG U+</option>
                  <option value="mvno">알뜰폰</option>
                </select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
      <Btn type="submit" size="lg" className="w-full" disabled={!agreed}>
        결제하기
      </Btn>
    </form>
  );
}
