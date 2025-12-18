"use server";

import { generateAccessEncrypt, generateEntryEncrypt } from "@/shared/lib/jose";
import { sendEmail } from "@/domains/auth/actions";
import { isEmailExists } from "@/domains/user";
import { APIRESPONSE } from "@/shared/types/api";
import { CustomError } from "@/shared/types/error";
import { actionHttpError } from "@/shared/utils/error";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import z from "zod";

const FindUserPasswordSchema = z.object({
  email: z.email("이메일 형식이 올바르지 않습니다."),
});

const createChangePWDomain = (token: string): string => {
  return process.env.NODE_ENV === "development"
    ? `http://localhost:3000/change-pw?t=${encodeURIComponent(token)}`
    : "";
};

export const findUserPassword = async (
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE> => {
  // 이메일 비밀번호 재설정 링크 전송
  // nodeMailer 라이브러리 사용

  try {
    const data = {
      email: formData.get("email") as string,
    };

    const isParse = FindUserPasswordSchema.safeParse(data);

    if (!isParse.success) {
      throw new CustomError(isParse.error.issues[0].message, 400);
    }
    const { email } = isParse.data;
    const isEmail = await isEmailExists(email);

    if (!isEmail) throw new CustomError("등록되지 않은 이메일입니다.", 400);

    // entry token 발행 && createDomatin

    // 수정 사항 Email을 Encrypt 하지 않고 Cookie 의 값에 저장 * (만료시간이 짧은) 영구 쿠키

    const cookieStore = await cookies();

    const options: Partial<ResponseCookie> = {
      httpOnly: true,
      maxAge: 600,
      secure: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
    };

    cookieStore.set("userEmail", email, options);

    const entryToken = await generateEntryEncrypt();

    // 도메인을 생성
    const path = createChangePWDomain(entryToken);

    await sendEmail({ email, path });

    return {
      success: true,
      data: {
        message: "이메일 발송에 성공하였습니다.",
        payload: undefined,
      },
    };
  } catch (e) {
    return actionHttpError(e);
  }
};
