"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "../styles/page.module.css";
import useAuthStore from "../store/authStore";
import { singOut } from "../actions/auth";

interface HomeFormProps {
  user: string | null;
}

const HomeForm = ({ user }: HomeFormProps) => {
  const setUserId = useAuthStore((state) => state.setUserId);

  useEffect(() => {
    console.log("user in HomeForm:", user);

    setUserId(user ? user : "");
  }, [user, setUserId]);

  return (
    <div className={styles.page}>
      {/* 네비게이션 바 */}
      <nav
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #dee2e6",
          marginBottom: "20px",
        }}
        // className="mx-4 mb-5 rounded-4xl border-b border-gray-200 bg-gray-50 p-5 hover:bg-red-50"
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textDecoration: "none",
              color: "#333",
            }}
          >
            New Invitation
          </Link>

          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            {!user ? (
              <>
                <Link
                  href="/auth/login"
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#007cba",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  로그인
                </Link>
                <Link
                  href="/auth/register"
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#28a745",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/dashboard`}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#007cba",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  대시보드
                </Link>
                <button
                  onClick={singOut}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>
          New Invitation에 오신 것을 환영합니다!
        </h1>

        <p
          style={{
            fontSize: "18px",
            textAlign: "center",
            maxWidth: "600px",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          간편하고 아름다운 초대장을 만들어보세요. 결혼식, 생일파티, 회사 행사
          등 다양한 용도의 초대장을 제작할 수 있습니다.
        </p>

        {!user && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Link
              href="/auth/register"
              style={{
                padding: "15px 30px",
                backgroundColor: "#007cba",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              시작하기
            </Link>
            <Link
              href="/auth/login"
              style={{
                padding: "15px 30px",
                backgroundColor: "transparent",
                color: "#007cba",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "bold",
                border: "2px solid #007cba",
              }}
            >
              로그인
            </Link>
          </div>
        )}

        {user && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Link
              href="/dashboard"
              style={{
                padding: "15px 30px",
                backgroundColor: "#007cba",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              대시보드로 이동
            </Link>
            <Link
              href="/invitations/create"
              style={{
                padding: "15px 30px",
                backgroundColor: "#28a745",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              초대장 만들기
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeForm;
