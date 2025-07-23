"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "../_hooks/useAuth";
import useAuthStore from "../_store/authStore";

export default function DashboardPage() {
  // private route, only accessible if authenticated
  const router = useRouter();

  const { isAuthenticated } = useAuth();
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <div>
          <h1>대시보드</h1>
          <p>안녕하세요! {userId}님</p>
        </div>
        <button
          // onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <h3>내 정보</h3>

          <Link
            href={`/profile`}
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#007cba",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            프로필 수정
          </Link>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <h3>초대장 관리</h3>
          <p>초대장을 생성하고 관리하세요.</p>
          <Link
            href="/invitations"
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            초대장 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
