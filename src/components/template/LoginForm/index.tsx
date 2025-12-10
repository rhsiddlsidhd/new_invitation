"use client";

import type React from "react";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { GlobeAmericasIcon } from "@/components/atoms/Icon";
import { signIn } from "@/actions/auth/signIn";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, null);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);

  const handleGoogleLogin = () => {
    console.log("[v0] Google login clicked");
    // TODO: Implement Google OAuth
  };

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
          <Label htmlFor="email">이메일</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
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
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              name="remember"
              // checked={rememberMe}
              // onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label
              htmlFor="remember"
              className="cursor-pointer text-sm font-normal"
            >
              로그인 상태 유지
            </Label>
          </div>

          <Link
            href="/forgot-password"
            className="text-primary text-sm hover:underline"
          >
            비밀번호 찾기
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg">
          로그인
        </Button>
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
        onClick={handleGoogleLogin}
      >
        <GlobeAmericasIcon className="mr-2 h-5 w-5" />
        Google로 계속하기
      </Button>

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
