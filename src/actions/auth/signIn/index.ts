"use server";

import { setAuthTokenCookie } from "@/services/auth";
import { comparePasswords, getUserPasswordById } from "@/services/user";
import { APIRESPONSE } from "@/types/api";

import { CustomError } from "@/types/error";
import { actionHttpError } from "@/utils/error";

import z from "zod";

const passwordSchema = z
  .string()
  .refine(
    (v) =>
      v.length >= 6 &&
      v.length <= 12 &&
      /[A-Za-z]/.test(v) &&
      /[0-9]/.test(v) &&
      /[^A-Za-z0-9]/.test(v),
    {
      message:
        "비밀번호는 영문자, 숫자, 특수문자를 포함한 최소 6자 이상 최대 12자 이하입니다.",
    },
  );

const LoginSchema = z.object({
  email: z.email("이메일 형식이 올바르지 않습니다."),
  password: passwordSchema,
  remember: z.boolean(),
});

export const signIn = async (
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE<string>> => {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      remember: formData.get("remember") ? true : false,
    };

    if (!data.email || !data.password) {
      throw new CustomError("아이디와 비밀번호를 확인해주세요.", 400);
    }

    const isUser = LoginSchema.safeParse(data);

    if (!isUser.success) {
      throw new CustomError(isUser.error.issues[0].message, 400);
    }

    // 이메일를 바탕으로 사용자의 PASSWORD 가져오기
    const user = await getUserPasswordById(data.email);

    const isPasswordValid = await comparePasswords(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new CustomError("비밀번호가 일치하지 않습니다.", 401);
    }

    const { token } = await setAuthTokenCookie(data.email, data.remember);

    return {
      success: true,
      data: {
        code: 200,
        message: "로그인에 성공하였습니다.",
        payload: token,
      },
    };
  } catch (e) {
    return actionHttpError(e);
  }
};
