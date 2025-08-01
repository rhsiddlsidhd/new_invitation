"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn } from "@/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, null);

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
      <h1>로그인</h1>

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
          <label htmlFor="userId">아이디:</label>
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
          {pending ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <Link href="/auth/register" style={{ color: "#007cba" }}>
          계정이 없으신가요? 회원가입
        </Link>
      </div>
    </div>
  );
}
