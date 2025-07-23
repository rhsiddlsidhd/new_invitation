"use client";
import useAuth from "@/app/_hooks/useAuth";
import useAuthStore from "@/app/_store/authStore";
import { verifyPassword } from "@/app/_utils/apiClient";

import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsPasswordVerified } = useAuthStore();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated === false) {
      console.log("User is not authenticated");
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      const data = await verifyPassword({ password: formData.password, token });
      if (!data.success) {
        setError(data.message);
      } else {
        setIsPasswordVerified(true);
        const path = searchParams.get("next");
        if (path) router.push(path);
      }
    } catch (err) {
      console.error("비밀번호 검증 중 오류 발생:", err);
      setError("비밀번호 검증 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return <div>로딩중</div>;

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px" }}>
      <h2>비밀번호 확인</h2>
      <p>프로필을 수정하기 위해 현재 비밀번호를 입력해주세요.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="현재 비밀번호"
          value={formData.password}
          autoComplete="off"
          name="password"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "확인 중..." : "확인"}
        </button>
      </form>
    </div>
  );
};

export default VerifyPage;
