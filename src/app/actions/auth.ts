"use server";

import { redirect } from "next/navigation";
import {
  checkUserIdExists,
  createUser,
  verifyPassword,
} from "../_services/userServices";
import { createSession, deleteSession } from "../_lib/session";

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

export const signIn = async (prev: any, formData: FormData) => {
  const userId = formData.get("userId") as string;
  const password = formData.get("password") as string;

  if (!userId || !password) {
    return {
      success: false,
      message: "아이디와 비밀번호를 확인해주세요.",
    };
  }

  const user = await checkUserIdExists(userId);

  if (!user.success) {
    return user;
  }

  const { password: hashedPassword, userId: dbUserId } = user.data;

  const isPasswordValid = await verifyPassword(password, hashedPassword);

  if (!isPasswordValid) {
    return {
      success: false,
      message: "비밀번호가 일치하지 않습니다.",
    };
  }

  await createSession(dbUserId);

  redirect("/");
};

export const singOut = async () => {
  await deleteSession();
};
