"use client";
import { signUp } from "@/actions/auth";
import useAuthStore from "@/store/authStore";
import React, { useActionState, useEffect } from "react";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(signUp, null);
  const { setModalOpen } = useAuthStore();

  useEffect(() => {
    if (state && state.success) {
      setModalOpen(true, "login");
    }
  }, [state, setModalOpen]);

  return (
    <div>
      {state && (
        <div
          style={{
            color: "red",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#fee",
            borderRadius: "4px",
          }}
        >
          {state.message}
        </div>
      )}

      <form action={action}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="userId">사용자 ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: pending ? "#ccc" : "#007cba",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: pending ? "not-allowed" : "pointer",
          }}
        >
          {pending ? "가입 중..." : "회원가입"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <div
          onClick={() => setModalOpen(true, "login")}
          style={{ color: "#007cba" }}
        >
          이미 계정이 있으신가요? 로그인
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
