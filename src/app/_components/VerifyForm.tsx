"use client";
import React from "react";

const VerifyForm = () => {
  //  const searchParams = useSearchParams();
  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px" }}>
      <h2>비밀번호 확인</h2>
      <p>프로필을 수정하기 위해 현재 비밀번호를 입력해주세요.</p>

      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
    </div>
  );
};

export default VerifyForm;
