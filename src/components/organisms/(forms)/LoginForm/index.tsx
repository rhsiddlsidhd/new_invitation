"use client";

import type React from "react";
import { useActionState, useEffect } from "react";

import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { GlobeAmericasIcon } from "@/components/atoms/Icon";

import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authTokenStore";
import { signIn } from "@/actions/signIn";
import Alert from "@/components/atoms/Alert/Alert";
import { Btn } from "@/components/atoms/Btn/Btn";
import Label from "@/components/atoms/Label/Label";
import { Input } from "@/components/atoms/Input/Input";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";

export function LoginForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(signIn, null);
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    if (state && state.success) {
      setToken(state.data.token);
      router.push("/");
    } else if (state && !state.success) {
      console.log(state.error);
    }
  }, [state, setToken, router]);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-foreground text-3xl font-bold">로그인</h1>
        <p className="text-muted-foreground">
          계정에 로그인하여 청첩장을 만들어보세요
        </p>
      </div>

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일 </Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              className="pl-10"
              required
            />
          </div>
        </div>

        {state && !state.success && (
          <Alert type="error">{state.error.message}</Alert>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" name="remember" />

            <Label
              htmlFor="remember"
              className="cursor-pointer text-sm font-normal"
            >
              로그인 상태 유지
            </Label>
          </div>

          <Link
            href="/find-pw"
            className="text-primary text-sm hover:underline"
          >
            비밀번호 찾기
          </Link>
        </div>

        <Btn type="submit" className="w-full" size="lg">
          {pending ? "로그인 중" : "로그인"}
        </Btn>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="border-border w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background text-muted-foreground px-4">또는</span>
        </div>
      </div>

      <Btn
        type="button"
        variant="outline"
        className="w-full bg-transparent"
        size="lg"
      >
        <GlobeAmericasIcon className="mr-2 h-5 w-5" />
        Google로 계속하기
      </Btn>

      <div className="space-y-2 text-center">
        <p className="text-muted-foreground text-sm">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline"
          >
            회원가입
          </Link>
        </p>
        <Link
          href="/find-id"
          className="text-muted-foreground hover:text-foreground inline-block text-sm transition-colors"
        >
          아이디 찾기
        </Link>
      </div>
    </div>
  );
}
