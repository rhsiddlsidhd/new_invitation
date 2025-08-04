"use client";
import React, { useActionState, useEffect } from "react";
import { deleteUserAction } from "../actions/user";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";

const DeleteForm = () => {
  const [state, action, pending] = useActionState(deleteUserAction, null);
  const { userId } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (state && state.success) {
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

export default DeleteForm;
