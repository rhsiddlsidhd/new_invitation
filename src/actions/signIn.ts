"use server";

import { APIResponse, success } from "@/api/response";

import { validateAndFlatten } from "@/lib/validation";
import { LoginSchema } from "@/schemas/login.schema";
import { encrypt } from "@/lib/token";
import { setCookie } from "@/lib/cookies/set";
import { comparePasswords, getUserPasswordById } from "@/services/auth.service";

import { handleActionError } from "@/api/error";
import { HTTPError } from "@/api/type";

export const signIn = async (
  prev: unknown,
  formData: FormData,
): Promise<APIResponse<{ token: string }>> => {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      remember: formData.get("remember") ? true : false,
    };

    if (!data.email || !data.password) {
      throw new HTTPError("아이디와 비밀번호를 확인해주세요.", 400);
    }

    const parsed = validateAndFlatten(LoginSchema, data);

    if (!parsed.success) {
      throw new HTTPError("입력 값을 확인해주세요.", 400, parsed.error);
    }

    const { email, password, remember } = parsed.data;

    // 이메일를 바탕으로 사용자의 PASSWORD 가져오기
    const user = await getUserPasswordById(email);

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new HTTPError("비밀번호가 일치하지 않습니다.", 401);
    }

    const refreshJWT = await encrypt({ email, type: "REFRESH" });

    await setCookie({ name: "token", value: refreshJWT, remember });

    const accessJWT = await encrypt({ email, type: "ACCESS" });

    return success({ token: accessJWT });
  } catch (e) {
    return handleActionError(e);
  }
};
