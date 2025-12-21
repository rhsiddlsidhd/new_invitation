"use server";
import { cookies } from "next/headers";

import { comparePasswords, getUserPasswordById } from "@/domains/user";
import { decrypt } from "@/shared/lib/token";
import { deleteAuthToken, getAuthToken } from "@/domains/auth";
import { APIResponse, success } from "@/shared/utils/response";
import { ServerError } from "@/shared/types/error";
import { handleActionError } from "@/shared/utils/error";

export const verifyPassword = async (
  prev: unknown,
  formData: FormData,
): Promise<APIResponse<{ message: string; payload: undefined }>> => {
  try {
    const password = formData.get("password") as string;
    if (!password) {
      return {
        success: false,
        error: {
          code: 400,
          message: "비밀번호를 입력해주세요.",
        },
      };
    }

    const token = await getAuthToken();
    const result = await decrypt({ token, type: 'REFRESH' });
    if (!result.payload) throw new ServerError("인증에 실패하였습니다", 401);

    const { password: hashedPassword } = await getUserPasswordById(
      result.payload.email,
    );

    const isPasswordValid = await comparePasswords(password, hashedPassword);

    if (!isPasswordValid)
      throw new ServerError("비밀번호가 올바르지 않습니다", 401);

    // 성공시 쿠키 설정
    const cookieStore = await cookies();

    cookieStore.set("password-verified", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60, // 10분
      sameSite: "strict",
    });

    return success({
      message: "비밀번호 인증에 성공했습니다",
      payload: undefined,
    });
  } catch (error) {
    await deleteAuthToken();
    return handleActionError(error);
  }
};
