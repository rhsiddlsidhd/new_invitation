"use server";
import { cookies } from "next/headers";

import { comparePasswords, getUserPasswordById } from "@/services/user";
import { APIRESPONSE } from "@/types";
import { decrypt } from "@/lib/jose";
import { deleteAuthToken, getAuthToken } from "@/services/auth/token";

export const verifyPassword = async (
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE<{ path: string }>> => {
  try {
    const path = formData.get("next") as string;
    const password = formData.get("password") as string;
    if (!password) {
      return {
        success: false,
        // message: "비밀번호를 입력해주세요.",
        error: {
          code: 400,
          message: "비밀번호를 입력해주세요.",
        },
      };
    }

    const token = await getAuthToken();
    const { userId } = await decrypt(token);
    if (!userId) throw new Error("Invalid token payload");

    const { password: hashedPassword } = await getUserPasswordById(userId);

    const isPasswordValid = await comparePasswords(password, hashedPassword);

    if (!isPasswordValid) {
      return {
        success: false,
        error: {
          code: 401,
          message: "비밀번호가 올바르지 않습니다.",
        },
      };
    }

    // 성공시 쿠키 설정
    const cookieStore = await cookies();
    cookieStore.set("password-verified", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60, // 10분
      sameSite: "strict",
    });

    return {
      success: true,
      data: {
        code: 200,
        message: "비밀번호 인증에 성공했습니다.",
        payload: { path },
      },
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    console.error(message);
    await deleteAuthToken();
    return {
      success: false,
      error: {
        code: 500,
        message,
      },
    };
  }
};
