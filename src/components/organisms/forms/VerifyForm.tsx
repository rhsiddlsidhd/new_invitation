"use client";
import React, { useActionState } from "react";

import { verifyPasswordAction } from "../../../actions/auth";
import Alert from "../../atoms/Alert";
import Input from "../../atoms/Input";
import Btn from "../../atoms/Btn";
import Box from "../../layout/Box";

interface VerifyFormProps {
  path: string;
}

const VerifyForm = ({ path }: VerifyFormProps) => {
  const [state, action, pending] = useActionState(verifyPasswordAction, null);

  return (
    <div className="flex h-screen items-center justify-center">
      <Box className="w-full max-w-[400px]">
        <h2>비밀번호 확인</h2>
        <p>현재 비밀번호를 입력해주세요.</p>

        <form action={action}>
          <input type="hidden" name="next" value={path} />
          {state && !state.success && (
            <Alert type="error" className="mt-2">
              {state.message}
            </Alert>
          )}
          <input
            type="text"
            name="username"
            style={{ display: "none" }}
            autoComplete="username"
          />
          <Input
            type="password"
            placeholder="현재 비밀번호"
            name="password"
            autoComplete="current-password"
            className="my-2"
            required
          />

          <Btn
            type="submit"
            pending={pending}
            bgColor="bg-[#007bff]"
            className="w-full"
          >
            {pending ? "확인 중..." : "확인"}
          </Btn>
        </form>
      </Box>
    </div>
  );
};

export default VerifyForm;
