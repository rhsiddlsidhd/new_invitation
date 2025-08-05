"use client";
import React, { useActionState } from "react";

import { verifyPasswordAction, ActionState } from "../actions/auth";

interface VerifyFormProps {
  path: string;
}

const VerifyForm = ({ path }: VerifyFormProps) => {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    verifyPasswordAction,
    null,
  );

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px" }}>
      <h2>비밀번호 확인</h2>
      <p>현재 비밀번호를 입력해주세요.</p>

      <form action={action}>
        <input type="hidden" name="next" value={path} />
        <input
          type="text"
          name="username"
          style={{ display: "none" }}
          autoComplete="username"
        />
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
