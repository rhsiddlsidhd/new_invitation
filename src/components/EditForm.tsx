"use client";

import React, { useActionState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "../actions/user";

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
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "50px auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>프로필 수정</h2>
      <form action={action}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            name="email"
            required
          />
        </div>
        {state && !state.success && (
          <p style={{ color: "red" }}>{state.message}</p>
        )}
        <button type="submit" disabled={pending}>
          {pending ? "수정 중..." : "수정"}
        </button>
      </form>
    </div>
  );
};

export default EditForm;
