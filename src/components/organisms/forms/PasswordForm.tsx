"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updatedUserPassword } from "../../../actions/user";
import Box from "../../layout/Block";
import Alert from "../../atoms/Alert";
import Label from "../../atoms/Label";
import Input from "../../atoms/Input";
import Btn from "../../atoms/Btn";

const PasswordForm = () => {
  const [state, action, pending] = useActionState(updatedUserPassword, null);
  const router = useRouter();

  useEffect(() => {
    if (state && state.success) {
      alert(state.message);
      router.push("/profile");
    }
  }, [state, router]);
  return (
    <div className="flex h-screen items-center justify-center">
      <Box className="w-full max-w-[400px]">
        <h2>비밀번호 수정</h2>
        <form action={action}>
          {state && !state.success && (
            <Alert type="error" className="mt-2">
              {state.message}
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
