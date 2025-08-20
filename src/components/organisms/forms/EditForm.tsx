"use client";

import React, { useActionState, useEffect } from "react";
import useAuthStore from "../../../store/authStore";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "../../../actions/user";
import Box from "../../atoms/Box";
import Alert from "../../atoms/Alert";
import Label from "../../atoms/Label";
import Input from "../../atoms/Input";
import Btn from "../../atoms/Btn";

const EditForm = () => {
  const [state, action, pending] = useActionState(updateUserProfile, null);
  const { setUserEmail } = useAuthStore();
  const router = useRouter();

  // 성공시 처리
  useEffect(() => {
    if (state && state.success && state.data) {
      const { email } = state.data;
      alert(`${email}로 프로필이 수정되었습니다.`);
      setUserEmail(email);
      router.push("/profile");
    }
  }, [state, setUserEmail, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Box className="w-full max-w-[400px]">
        <h2>프로필 수정</h2>
        <form action={action}>
          {state && !state.success && (
            <Alert type="error" className="mt-2">
              {state.message}
            </Alert>
          )}
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
