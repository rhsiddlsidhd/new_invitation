"use client";

import useAuthStore from "@/app/_store/authStore";
import { deleteUserAction } from "@/app/actions/user";

import { useRouter } from "next/navigation";

import React, { useActionState, useEffect } from "react";

const DeletePage = () => {
  const [state, action, pending] = useActionState(deleteUserAction, null);

  const { isPasswordVerified, setIsPasswordVerified, userId } = useAuthStore();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [formData, setFormData] = useState({
  //   userId: "",
  // });
  const router = useRouter();
  useEffect(() => {
    if (!isPasswordVerified) router.push("/");
  }, [isPasswordVerified, router]);

  useEffect(() => {
    if (state && state.success) {
      console.log("도착?");
      alert(state.message);
      router.push("/profile");
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
      <h2>계정 삭제</h2>
      <form action={action}>
        <div>
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            placeholder={userId}
            autoComplete="off"
            name="userId"
            required
          />
        </div>

        {state && !state.success && (
          <p style={{ color: "red" }}>{state.message}</p>
        )}
        <button type="submit" disabled={pending}>
          {pending ? "삭제 중..." : "삭제"}
        </button>
      </form>
    </div>
  );
};
export default DeletePage;
