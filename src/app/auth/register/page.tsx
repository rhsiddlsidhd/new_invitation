"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { signUp } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(signUp, null);
  const router = useRouter();

  useEffect(() => {
    if (state && state.success) {
      alert(state.message);
      router.push("/auth/login");
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
      <h1>회원가입</h1>

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
        <Link href="/auth/login" style={{ color: "#007cba" }}>
          이미 계정이 있으신가요? 로그인
        </Link>
      </div>
    </div>
  );
}
