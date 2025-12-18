"use client";
import React, { useActionState, useEffect } from "react";

import Box from "../../layout/Box";
import Label from "../../atoms/Label";
import Input from "../../atoms/Input";
import Alert from "../../atoms/Alert";
import Btn from "../../atoms/Btn";
import { deleteUser } from "@/domains/user/actions";

const DeleteForm = ({ user }: { user: string }) => {
  const [state, action, pending] = useActionState(deleteUser, null);
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      alert("성공적으로 탈퇴처리 되었습니다.");
      window.location.href = "/";
    }
  }, [state]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Box className="w-full max-w-[400px]">
        <h2>계정 삭제</h2>
        <form action={action}>
          {state && !state.success && state.error.code !== 500 && (
            <Alert type="error" className="mt-2">
              {state.error.message}
            </Alert>
          )}
          <div className="my-2">
            <Label htmlFor="userId">아이디</Label>
            <Input
              type="text"
              id="userId"
              placeholder={user}
              autoComplete="off"
              name="userId"
              required
            />
          </div>

          <Btn
            type="submit"
            pending={pending}
            bgColor="bg-[#007bff]"
            className="w-full"
          >
            {pending ? "삭제 중..." : "삭제"}
          </Btn>
        </form>
      </Box>
    </div>
  );
};

export default DeleteForm;
