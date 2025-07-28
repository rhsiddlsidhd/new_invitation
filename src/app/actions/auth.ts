"use server";

import { redirect } from "next/navigation";
import { createUser } from "../_services/userServices";

export async function signup(prev: any, formData: FormData) {
  console.log("Action: signup", prev);

  const email = formData.get("email") as string;
  const userId = formData.get("userId") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !userId || !password) {
    return {
      success: false,
      message: "모든 필드를 입력해주세요.",
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "비밀번호가 일치하지 않습니다.",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "비밀번호는 최소 6자 이상이어야 합니다.",
    };
  }

  const result = await createUser({ formData });

  if (!result.success) {
    return result; // 그냥 객체 반환
  }

  // 성공 시 리다이렉트
  redirect("/auth/login");
}
