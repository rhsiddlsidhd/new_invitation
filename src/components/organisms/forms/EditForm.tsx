"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "../../layout/Box";
import Label from "../../atoms/Label/Label";
import Input from "../../atoms/Input/Input";
import Btn from "../../atoms/Btn";
import { patchUserProfile } from "@/__domains/user/actions";

const EditForm = () => {
  const [state, action, pending] = useActionState(patchUserProfile, null);
  const router = useRouter();

  // 성공시 처리
  useEffect(() => {
    if (!state) return;
    if (state.success && state.data) {
      const { email } = state.data.payload;
      alert(`${email}로 프로필이 수정되었습니다.`);
      router.push("/profile");
      return;
    }

    router.push("/");
  }, [state, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Box className="w-full max-w-[400px]">
        <h2>프로필 수정</h2>
        <form action={action}>
          <div className="my-2">
            <Label htmlFor="email">이메일:</Label>
            <Input
              type="email"
              id="email"
              autoComplete="off"
              name="email"
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

export default EditForm;
