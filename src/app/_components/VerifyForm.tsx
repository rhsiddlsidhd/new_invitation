"use client";
import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyPasswordAction, ActionState } from "../actions/auth";
import useAuthStore from "../_store/authStore";

interface VerifyFormProps {
  searchParams: { [key: string]: string };
}

const VerifyForm = ({ searchParams }: VerifyFormProps) => {
  const router = useRouter();
  const setIsPasswordVerified = useAuthStore(
    (state) => state.setIsPasswordVerified
  );
  const [state, action, pending] = useActionState<ActionState, FormData>(
    verifyPasswordAction,
    null
  );

  // 성공 시 next 경로로 이동
  useEffect(() => {
    if (state && state.success) {
      const nextUrl = searchParams.next as string;
      setIsPasswordVerified(true);
      router.push(nextUrl || "/"); // 기본값 포함
    }
  }, [state, searchParams.next, router, setIsPasswordVerified]);

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px" }}>
      <h2>비밀번호 확인</h2>
      <p>프로필을 수정하기 위해 현재 비밀번호를 입력해주세요.</p>

      <form action={action}>
        <input
          type="password"
          placeholder="현재 비밀번호"
          name="password"
          autoComplete="current-password"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        {state && !state.success && (
          <p style={{ color: "red" }}>{state.message}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: pending ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: pending ? "not-allowed" : "pointer",
          }}
        >
          {pending ? "확인 중..." : "확인"}
        </button>
      </form>
    </div>
  );
};

export default VerifyForm;
