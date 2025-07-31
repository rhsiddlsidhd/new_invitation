"use server";

import { redirect } from "next/navigation";
import {
  checkUserDuplicate,
  checkUserIdExists,
  createUser,
  getUserPasswordById,
  hashPassword,
  verifyPassword,
} from "../_services/userServices";
import { createSession, deleteSession, getUserByToken } from "../_lib/session";
import { cookies, headers } from "next/headers";

export type ActionState = {
  success: boolean;
  message?: string;
} | null;

export async function signUp(prev: ActionState, formData: FormData) {
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

  const user = await checkUserDuplicate(email, userId);

  if (!user.success) {
    return user;
  }

  const hashedPassword = await hashPassword(password);

  const result = await createUser({
    password: hashedPassword,
    email: email,
    userId: userId,
  });

  if (!result.success) {
    return result;
  }

  // 성공 시 리다이렉트
  return result;
}

export const signIn = async (prev: ActionState, formData: FormData) => {
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
  redirect("/auth/login");
};

export const verifyPasswordAction = async (
  prev: ActionState,
  formData: FormData
) => {
  const header = await headers();
  const userId = header.get("x-user-id");
  const password = formData.get("password") as string;

  if (!password) {
    return {
      success: false,
      message: "비밀번호를 입력해주세요.",
    };
  }

  if (!userId) {
    throw new Error("인증 정보를 찾을 수 없습니다.");
  }

  const dbUser = await getUserPasswordById(userId);

  if (!dbUser.success) {
    return dbUser;
  }

  const { password: hashedPassword } = dbUser.data;

  const isPasswordValid = await verifyPassword(password, hashedPassword);

  if (!isPasswordValid) {
    return {
      success: false,
      message: "비밀번호가 일치하지 않습니다.",
    };
  }

  // 성공시 쿠키 설정
  const cookieStore = await cookies();
  cookieStore.set("password-verified", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 60, // 30분
    sameSite: "strict",
  });

  return {
    success: true,
    message: "비밀번호 확인이 완료되었습니다.",
  };
};
