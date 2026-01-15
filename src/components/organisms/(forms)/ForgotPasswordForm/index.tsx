"use client";

import type React from "react";
import { useActionState, useEffect } from "react";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/atoms/Card/Card";
import { Btn } from "@/components/atoms/Btn/Btn";
import LabeledInput from "@/components/molecules/(input-group)/LabeledInput";

import { requestPasswordReset } from "@/actions/requestPasswordReset";
import { getFieldError, hasFieldErrors } from "@/utils/error";
import { APIResponse } from "@/types/error";

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState<
    APIResponse<{ message: string; email: string }>,
    FormData
  >(requestPasswordReset, null);

  useEffect(() => {
    if (!state || state.success === true) return;

    if (!hasFieldErrors(state.error)) {
      toast.error(state.error.message);
    }
  }, [state]);

  const emailError = getFieldError(state, "email");

  if (state && state.success === true) {
    return (
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-primary/10 rounded-full p-4">
              <CheckCircle2 className="text-primary h-12 w-12" />
            </div>
          </div>
          <h1 className="text-foreground text-3xl font-bold">
            이메일을 확인하세요
          </h1>
          <p className="text-muted-foreground">
            비밀번호 재설정 링크를 보내드렸습니다
          </p>
        </div>

        <Card className="bg-muted/50 p-6">
          <div className="space-y-3 text-sm">
            <p className="font-medium">
              다음 이메일로 재설정 링크가 전송되었습니다:
            </p>
            <p className="text-primary font-semibold">{state.data.email}</p>
            <div className="text-muted-foreground space-y-2 pt-3">
              <p>• 이메일이 도착하지 않았다면 스팸함을 확인해주세요</p>
              <p>• 링크는 10분 동안 유효합니다</p>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <Btn asChild className="w-full" size="lg">
            <Link href="/login">로그인으로 돌아가기</Link>
          </Btn>
          <form action={action}>
            <input
              type="hidden"
              name="email"
              value={state.data.email}
              readOnly
            />
            <Btn
              type="submit"
              variant="outline"
              className="w-full bg-transparent"
              size="lg"
              disabled={pending}
            >
              {pending ? "전송 중..." : "다시 보내기"}
            </Btn>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-foreground text-3xl font-bold">비밀번호 찾기</h1>
        <p className="text-muted-foreground">
          가입한 이메일 주소를 입력해주세요
        </p>
      </div>

      <form action={action} className="space-y-4">
        <LabeledInput
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          error={emailError}
        >
          이메일
        </LabeledInput>

        <p className="text-muted-foreground text-sm">
          입력하신 이메일로 비밀번호 재설정 링크를 보내드립니다
        </p>

        <Btn type="submit" className="w-full" size="lg" disabled={pending}>
          {pending ? "전송 중..." : "재설정 링크 받기"}
        </Btn>
      </form>

      <div className="space-y-2 text-center">
        <p className="text-muted-foreground text-sm">
          아이디가 기억나지 않으신가요?{" "}
          <Link
            href="/find-id"
            className="text-primary font-medium hover:underline"
          >
            아이디 찾기
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
