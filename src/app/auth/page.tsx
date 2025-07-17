import React from "react";
import { dbConnect, isConnected } from "../_utils/mongodb";

const AuthPage = async () => {
  let connectionStatus = "";

  let error = "";

  try {
    await dbConnect();

    if (isConnected()) {
      connectionStatus = "✅ MongoDB 연결 성공!";
    } else {
      connectionStatus = "❌ MongoDB 연결 실패";
    }
  } catch (e) {
    const err = e as Error;
    connectionStatus = "❌ MongoDB 연결 실패";
    error = err.message;
    console.error("연결 오류:", e);
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>MongoDB 연결 테스트 (서버 컴포넌트)</h1>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: connectionStatus.includes("✅")
            ? "transparent"
            : "#f8d7da",
          border: `1px solid ${
            connectionStatus.includes("✅") ? "#c3e6cb" : "#f5c6cb"
          }`,
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        <div>{connectionStatus}</div>

        {error && (
          <div style={{ marginTop: "10px", color: "#721c24" }}>
            오류: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
