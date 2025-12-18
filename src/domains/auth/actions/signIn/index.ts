"use server";

import { setAuthTokenCookie } from "@/domains/auth/actions";
import { comparePasswords, getUserPasswordById } from "@/domains/user";
import { APIRESPONSE } from "@/shared/types/api";
import { CustomError } from "@/shared/types/error";
import { actionHttpError } from "@/shared/utils/error";
import { LoginSchema } from "@/shared/utils/validation/schema.auth";

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

    const { email, password, remember } = isUser.data;

    // 이메일를 바탕으로 사용자의 PASSWORD 가져오기
    const user = await getUserPasswordById(email);

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError("비밀번호가 일치하지 않습니다.", 401);
    }

    const { token } = await setAuthTokenCookie(data.email, remember);

    return {
      success: true,
      data: {
        message: "로그인에 성공하였습니다.",
        payload: token,
      },
    };
  } catch (e) {
    return actionHttpError(e);
  }
};
