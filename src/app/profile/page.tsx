"use client";
import React, { useEffect } from "react";
import useAuthStore from "../_store/authStore";
import useAuth from "../_hooks/useAuth";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { userId, userEmail, isPasswordVerified } = useAuthStore(
    (state) => state
  );
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      console.log("User is not authenticated");
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    console.log(isPasswordVerified);
  }, [isPasswordVerified]);

  if (!isAuthenticated) return <div>로딩중</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 0",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#333",
              margin: 0,
            }}
          >
            내 프로필
          </h1>
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007cba",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* 프로필 카드 */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "40px",
            boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
            marginBottom: "30px",
          }}
        >
          {/* 프로필 아바타 영역 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
              paddingBottom: "30px",
              borderBottom: "1px solid #e9ecef",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#007cba",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "20px",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                {userId && userId.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#333",
                  margin: "0 0 8px 0",
                }}
              >
                {userId}
              </h2>
            </div>
          </div>

          {/* 정보 섹션 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
            }}
          >
            {/* 사용자 ID */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#555",
                  marginBottom: "8px",
                }}
              >
                사용자 ID
              </label>
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  border: "1px solid #e9ecef",
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                {userId || "정보 없음"}
              </div>
            </div>

            {/* 이메일 */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#555",
                  marginBottom: "8px",
                }}
              >
                이메일 주소
              </label>
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  border: "1px solid #e9ecef",
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                {userEmail || "정보 없음"}
              </div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 영역 */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "20px",
            }}
          >
            계정 관리
          </h3>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                transition: "background-color 0.2s",
              }}
              onClick={() => router.push("/verify?next=/profile/edit")}
              onMouseOver={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#218838")
              }
              onMouseOut={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#28a745")
              }
            >
              프로필 수정
            </button>

            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                transition: "background-color 0.2s",
              }}
              onClick={() => router.push("/verify?next=/profile/password")}
              onMouseOver={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#5a6268")
              }
              onMouseOut={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#6c757d")
              }
            >
              비밀번호 변경
            </button>

            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#b81f1f",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                transition: "background-color 0.2s",
              }}
              onClick={() => router.push("/verify?next=/profile/delete")}
              onMouseOver={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#b81f1fd3")
              }
              onMouseOut={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#b81f1f")
              }
            >
              계정 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
