"use client";

import { changeUserPW } from "@/actions/changeUserPW";
import { fetcher } from "@/api/fetcher";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Input } from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";

import { Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";

const deleteCookieToUserEmail = async () => {
  try {
    await fetcher<void>("/api/auth/cookie", { method: "DELETE" });
  } catch (error) {
    console.debug("Cookie deletion failed during cleanup:", error);
    return null;
  }
};

const ChangePWForm = () => {
  const router = useRouter();
  const [state, action, pending] = useActionState(changeUserPW, null);

  useEffect(() => {
    if (state && state.success) {
      alert(state.data.message);
      router.push("/login");
    }
  }, [state, router]);

  useEffect(() => {
    return () => {
      deleteCookieToUserEmail();
    };
  }, []);

  const fieldErrors = state && !state.success && state.error.errors;

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-foreground text-3xl font-bold">비밀번호 변경</h1>
        <p className="text-muted-foreground">변경할 비밀번호를 입력해주세요.</p>
      </div>

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label className="" htmlFor="password">
            비밀번호
          </Label>
          {fieldErrors && fieldErrors.password && (
            <span className="text-xs text-red-500">
              {fieldErrors.password[0]}
            </span>
          )}
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              비밀번호 확인{" "}
              {fieldErrors && fieldErrors.confirmPassword && (
                <span className="text-xs text-red-500">
                  {fieldErrors.confirmPassword[0]}
                </span>
              )}
            </Label>
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
          </div>
        </div>

        <Btn type="submit" className="w-full" size="lg">
          비밀번호 변경 {pending ? "중" : "완료"}
        </Btn>
      </form>

      <div className="space-y-2 text-center">
        <Link
          href="/login"
          className="text-muted-foreground hover:text-foreground inline-block text-sm transition-colors"
        >
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default ChangePWForm;
