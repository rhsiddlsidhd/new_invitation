"use server";
import { hashPassword } from "@/lib/bcrypt";
import { createUser, isUserDuplicate } from "@/services/user";
import { APIRESPONSE } from "@/types";

export async function signUp(
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE> {
  try {
    const email = formData.get("email") as string;
    const userId = formData.get("userId") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!email || !userId || !password) {
      return {
        success: false,
        error: {
          code: 400,
          message: "모든 필드를 입력해주세요.",
        },
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: {
          code: 400,
          message: "비밀번호는 최소 6자 이상이어야 합니다.",
        },
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        error: {
          code: 401,
          message: "비밀번호가 일치하지 않습니다.",
        },
      };
    }

    await isUserDuplicate(email, userId);

    const hashedPassword = await hashPassword(password);

    await createUser({
      password: hashedPassword,
      email: email,
      userId: userId,
    });

    return {
      success: true,
      data: {
        code: 200,
        message: `${userId}님 회원가입을 축하드립니다.`,
        payload: undefined,
      },
    };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "잠시 후 다시 시도해주세요.";
    console.error(message);
    return {
      success: false,
      error: {
        code: 500,
        message,
      },
    };
  }
}
