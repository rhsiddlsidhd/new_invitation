"use server";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import {
  checkUserDuplicate,
  checkUserIdExists,
  createUser,
  getUserPasswordById,
  hashPassword,
  verifyPassword,
} from "@/services/userServices";
import {
  createSession,
  decrypt,
  deleteSession,
  getSession,
} from "@/lib/session";

export async function signUp(prev: unknown, formData: FormData) {
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

export const signIn = async (prev: unknown, formData: FormData) => {
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

  return {
    success: true,
  };
};

export const signOut = async () => {
  await deleteSession();
};

export const verifyPasswordAction = async (
  prev: unknown,
  formData: FormData,
) => {
  const path = formData.get("next") as string;
  try {
    const password = formData.get("password") as string;
    if (!password) {
      return {
        success: false,
        message: "비밀번호를 입력해주세요.",
      };
    }

    const token = await getSession();
    const payload = await decrypt(token);

    const { data } = await getUserPasswordById(payload.userId);

    const hashedPassword = data.password;

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
  } catch (error) {
    console.error("??", error);
    await deleteSession();
    return redirect("/");
  }

  return redirect(path);
};
