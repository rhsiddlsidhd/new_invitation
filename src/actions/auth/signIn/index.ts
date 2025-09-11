"use server";

import { createSession } from "@/lib/session";
import { comparePasswords } from "@/services/userService";
import { checkUserIdExists } from "@/services/userServices";

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

  const isPasswordValid = await comparePasswords(password, hashedPassword);

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
