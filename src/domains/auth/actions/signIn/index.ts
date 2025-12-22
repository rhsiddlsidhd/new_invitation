"use server";

import { comparePasswords, getUserPasswordById } from "@/domains/user";
import { APIResponse, success } from "@/shared/utils/response";
import { ClientError } from "@/shared/types/error";
import { handleActionError } from "@/shared/utils/error";
import { validateAndFlatten } from "@/shared/lib/validation";
import { LoginSchema } from "../../validation";
import { encrypt } from "@/shared/lib/token";
import { setCookie } from "@/shared/lib/cookies";

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
      throw new ClientError("아이디와 비밀번호를 확인해주세요.", 400);
    }

    const result = validateAndFlatten(LoginSchema, data);

    if (!result.success) {
      throw new ClientError("입력 값을 확인해주세요.", 400, result.error);
    }

    const { email, password, remember } = result.data;

    // 이메일를 바탕으로 사용자의 PASSWORD 가져오기
    const user = await getUserPasswordById(email);

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new ClientError("비밀번호가 일치하지 않습니다.", 401);
    }

    const refreshJWT = await encrypt({ email, type: "REFRESH" });

    await setCookie({ name: "token", value: refreshJWT, remember });

    const accessJWT = await encrypt({ email, type: "ACCESS" });

    return success({ token: accessJWT });
  } catch (e) {
    return handleActionError(e);
  }
};
