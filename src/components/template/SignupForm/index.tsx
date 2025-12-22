"use client";

import type React from "react";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Mail, Lock, User, Phone } from "lucide-react";
import { GlobeAmericasIcon } from "@/components/atoms/Icon";

import { useRouter } from "next/navigation";
import { signUp } from "@/actions/signUp";

export function SignupForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(signUp, null);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const fieldErrors = state && !state.success && state.error.errors;
  const formError = state && !state.success && state.error.message;

  useEffect(() => {
    if (state && state.success) {
      alert(state.data.message);
      router.push("/login");
    }
  }, [state, router]);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-foreground text-3xl font-bold">회원가입</h1>
        <p className="text-muted-foreground">새 계정을 만들어 시작하세요</p>
      </div>

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <div className="relative">
            <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="홍길동"
              className="pl-10"
              required
            />
          </div>
          {fieldErrors && fieldErrors.name?.[0] && (
            <p className="text-destructive text-sm">{fieldErrors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="pl-10"
              required
            />
          </div>
          {fieldErrors && fieldErrors.email?.[0] && (
            <p className="text-destructive text-sm">
              {fieldErrors["email"][0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">전화번호</Label>
          <div className="relative">
            <Phone className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="010-1234-5678"
              className="pl-10"
              required
            />
          </div>
          {fieldErrors && fieldErrors.phone?.[0] && (
            <p className="text-destructive text-sm">{fieldErrors.phone[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              required
            />
          </div>
          {fieldErrors && fieldErrors.password?.[0] && (
            <p className="text-destructive text-sm">
              {fieldErrors.password[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              required
            />
          </div>
          {fieldErrors && fieldErrors.confirmPassword?.[0] && (
            <p className="text-destructive text-sm">
              {fieldErrors.confirmPassword[0]}
            </p>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) =>
                setAgreedToTerms(checked as boolean)
              }
            />
            <Label
              htmlFor="terms"
              className="cursor-pointer text-sm font-normal"
            >
              <Link href="#" className="text-primary hover:underline">
                이용약관
              </Link>
              에 동의합니다 (필수)
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="privacy"
              checked={agreedToPrivacy}
              onCheckedChange={(checked) =>
                setAgreedToPrivacy(checked as boolean)
              }
            />
            <Label
              htmlFor="privacy"
              className="cursor-pointer text-sm font-normal"
            >
              <Link href="#" className="text-primary hover:underline">
                개인정보 처리방침
              </Link>
              에 동의합니다 (필수)
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={!agreedToPrivacy || !agreedToTerms || pending}
        >
          회원가입
        </Button>
        {formError && (
          <p className="text-destructive text-center text-sm">{formError}</p>
        )}
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="border-border w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background text-muted-foreground px-4">또는</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full bg-transparent"
        size="lg"
      >
        <GlobeAmericasIcon className="mr-2 h-5 w-5" />
        Google로 가입하기
      </Button>

      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
