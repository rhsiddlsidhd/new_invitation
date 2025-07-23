"use client";
import useAuthStore from "@/app/_store/authStore";
import { updateUser } from "@/app/_utils/apiClient";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const EditPage = () => {
  const { isPasswordVerified, setIsPasswordVerified, setUserEmail } =
    useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  useEffect(() => {
    if (!isPasswordVerified) router.push("/profile/verify");
  }, [isPasswordVerified, router, setIsPasswordVerified]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");

      if (!token) return;
      const data = await updateUser(formData);
      if (!data.success) {
        setError(data.message);
        return;
      }
      const { email } = data.data;
      alert(`${email}로 프로필이 수정되었습니다.`);
      setUserEmail(email);
      router.push("/profile");
    } catch (e) {
      console.error("프로필 수정 중 오류 발생:", e);
      setError("프로필 수정 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!isPasswordVerified) return <div>로딩중</div>;

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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            autoComplete="off"
            name="email"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            autoComplete="off"
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "수정 중..." : "수정"}
        </button>
      </form>
    </div>
  );
};
export default EditPage;
