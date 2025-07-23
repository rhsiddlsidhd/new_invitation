"use client";

import useAuthStore from "@/app/_store/authStore";
import { deleteUser } from "@/app/_utils/apiClient";

import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const DeletePage = () => {
  const { isPasswordVerified, setIsPasswordVerified, userId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userId: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (!isPasswordVerified) router.push("/profile/verify");
  }, [isPasswordVerified, router, setIsPasswordVerified]);

  useEffect(() => {
    console.log("userId", userId);
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (formData.userId !== userId)
        return setError("아이디가 일치하지 않습니다.");
      const token = sessionStorage.getItem("token");
      if (!token) return;
      const data = await deleteUser(formData.userId);
      console.log(data);
      if (!data.success) {
        setError(data.message);
        return;
      }
      alert(`계정 삭제가 완료되었습니다.`);
      router.push("/");
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
      <h2>계정 삭제</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            value={formData.userId}
            placeholder={userId}
            autoComplete="off"
            name="userId"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "삭제 중..." : "삭제"}
        </button>
      </form>
    </div>
  );
};
export default DeletePage;
