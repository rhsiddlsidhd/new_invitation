"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "../../layout/Box";
import Alert from "../../atoms/Alert";
import Label from "../../atoms/Label";
import Input from "../../atoms/Input";
import Btn from "../../atoms/Btn";
import { changeUserPW } from "@/domains/auth/actions";

const PasswordForm = () => {
  const [state, action, pending] = useActionState(patchUserPassword, null);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      alert(state.data.message);
      router.push("/profile");
      return;
    }

    const { code } = state.error;

    if (code !== 401) {
      router.push("/");
    }
  }, [state, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Box className="w-full max-w-[400px]">
        <h2>비밀번호 수정</h2>
        <form action={action}>
          {state && !state.success && state.error.code === 401 && (
            <Alert type="error" className="mt-2">
              {state.error.message}
            </Alert>
          )}

          <div className="my-2">
            <Label htmlFor="password">새 비밀번호</Label>
            <Input
              type="password"
              id="password"
              autoComplete="off"
              name="password"
              required
            />
          </div>

          <div className="my-2">
            <Label htmlFor="passwordConfirm">새 비밀번호 확인</Label>
            <Input
              type="password"
              id="passwordConfirm"
              autoComplete="off"
              name="passwordConfirm"
              required
            />
          </div>

          <Btn
            type="submit"
            pending={pending}
            bgColor="bg-[#007bff]"
            className="w-full"
          >
            {pending ? "수정 중..." : "수정"}
          </Btn>
        </form>
      </Box>
    </div>
  );
};

export default PasswordForm;
