"use server";

import { generateAccessEncrypt } from "@/lib/jose";
import { sendEmail } from "@/services/auth";
import { isEmailExists } from "@/services/user";
import { APIRESPONSE } from "@/types/api";
import { CustomError } from "@/types/error";
import { actionHttpError } from "@/utils/error";
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

    const accessToken = await generateAccessEncrypt({ email });

    // 도메인을 생성
    const path = createChangePWDomain(accessToken);

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
