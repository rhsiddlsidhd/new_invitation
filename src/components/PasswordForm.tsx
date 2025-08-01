import React, { useActionState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";
import { updatedUserPassword } from "../actions/user";

const PasswordForm = () => {
  const [state, action, pending] = useActionState(updatedUserPassword, null);
  const isPasswordVerified = useAuthStore((state) => state.isPasswordVerified);
  const router = useRouter();

  useEffect(() => {
    if (!isPasswordVerified) router.push("/verify");
  }, [isPasswordVerified, router]);

  useEffect(() => {
    if (state && state.success) {
      alert(state.message);
      router.push("/profile");
    }
  }, [state, router]);
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
      <h2>비밀번호 수정</h2>
      <form action={action}>
        <div>
          <label htmlFor="password">새 비밀번호</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            name="password"
            required
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">새 비밀번호 확인</label>
          <input
            type="password"
            id="passwordConfirm"
            autoComplete="off"
            name="passwordConfirm"
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

export default PasswordForm;
