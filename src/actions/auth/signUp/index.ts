"use server";
import {
  checkUserDuplicate,
  createUser,
  hashPassword,
} from "@/services/userServices";

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
