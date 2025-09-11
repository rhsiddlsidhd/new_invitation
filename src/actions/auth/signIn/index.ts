"use server";

import { setAuthTokenCookie } from "@/services/authService";
import { comparePasswords, getUserPasswordById } from "@/services/userService";
import { APIRESPONSE } from "@/types";

export const signIn = async (
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE> => {
  try {
    const userId = formData.get("userId") as string;
    const password = formData.get("password") as string;

    if (!userId || !password) {
      return {
        success: false,
        error: {
          code: 400,
          message: "아이디와 비밀번호를 확인해주세요.",
        },
      };
    }

    // 아이디를 바탕으로 사용자의 PASSWORD 가져오기
    const user = await getUserPasswordById(userId);

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        error: {
          code: 401,
          message: "비밀번호가 일치하지 않습니다.",
        },
      };
    }

    await setAuthTokenCookie(userId);

    return {
      success: true,
      data: {
        code: 200,
        message: "로그인에 성공하였습니다.",
        payload: undefined,
      },
    };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "잠시 후 다시 시도해주세요.";
    const code = message === "사용자를 찾을 수 없습니다." ? 401 : 500;
    return {
      success: false,
      error: {
        code,
        message,
      },
    };
  }
};
