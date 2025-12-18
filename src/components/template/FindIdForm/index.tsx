"use client";

import type React from "react";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { User, Phone, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { findUserEmail } from "@/domains/auth/actions";

export function FindIdForm() {
  const [state, action, pending] = useActionState(findUserEmail, null);
  const fieldErrors = state && !state.success && state.error.fieldErrors;
  const formError = state && !state.success && state.error.message;

  if (state && state.success) {
    return (
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-foreground text-3xl font-bold">
            아이디 찾기 완료
          </h1>
          <p className="text-muted-foreground">
            입력하신 정보와 일치하는 아이디입니다
          </p>
        </div>

        <Card className="bg-muted/50 p-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-3">
              <Mail className="text-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm">
                회원님의 이메일
              </p>
              <p className="text-lg font-semibold">{state.data.payload}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link href="/login">로그인하기</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full bg-transparent"
            size="lg"
          >
            <Link href="/find-pw">비밀번호 찾기</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-foreground text-3xl font-bold">아이디 찾기</h1>
        <p className="text-muted-foreground">
          가입 시 등록한 정보를 입력해주세요
        </p>
      </div>

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            이름{" "}
            <span className="text-xs text-red-500">
              {fieldErrors && fieldErrors?.name && fieldErrors.name[0]}
            </span>
          </Label>
          <div className="relative">
            <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="홍길동"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            전화번호{" "}
            <span className="text-xs text-red-500">
              {fieldErrors && fieldErrors?.phone && fieldErrors.phone[0]}
            </span>
          </Label>
          <div className="relative">
            <Phone className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="phone"
              type="tel"
              name="phone"
              placeholder="010-1234-5678"
              className="pl-10"
              required
            />
          </div>
        </div>
        {formError && <p className="text-xs text-red-500">{formError}</p>}
        <Button type="submit" className="w-full" size="lg">
          아이디 찾기
        </Button>
      </form>

      <div className="space-y-2 text-center">
        <p className="text-muted-foreground text-sm">
          비밀번호가 기억나지 않으신가요?
          <Link
            href="/find-pw"
            className="text-primary font-medium hover:underline"
          >
            비밀번호 찾기
          </Link>
        </p>
        <Link
          href="/login"
          className="text-muted-foreground hover:text-foreground inline-block text-sm transition-colors"
        >
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
