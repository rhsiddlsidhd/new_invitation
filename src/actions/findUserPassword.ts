"use server";

import { encrypt } from "@/lib/token";
import { ClientError } from "@/shared/types/error";
import { handleActionError } from "@/shared/utils/error";
import { validateAndFlatten } from "@/lib/validation";
import { sendEmail } from "@/lib/email";
import { emailSchema } from "@/schemas/email.schema";
import { setCookie } from "@/lib/cookies/set";
import { APIResponse, success } from "@/shared/utils/response";
import { checkEmailDuplicate } from "@/services/user.service";

const createChangePWDomain = (token: string): string => {
  return process.env.NODE_ENV === "development"
    ? `http://localhost:3000/change-pw?t=${encodeURIComponent(token)}`
    : "";
};

export const findUserPassword = async (
  prev: unknown,
  formData: FormData,
): Promise<APIResponse<{ message: string }>> => {
  // 이메일 비밀번호 재설정 링크 전송
  // nodeMailer 라이브러리 사용

  try {
    const data = {
      email: formData.get("email") as string,
    };

    const parsed = validateAndFlatten(emailSchema, data);

    if (!parsed.success) {
      throw new ClientError("입력 값을 확인해주세요.", 400, parsed.error);
    }
    const { email } = parsed.data;

    const isEmail = await checkEmailDuplicate(email);

    if (!isEmail) throw new ClientError("등록되지 않은 이메일입니다.", 400);

    // entry token 발행 && createDomatin

    // 수정 사항 Email을 Encrypt 하지 않고 Cookie 의 값에 저장 * (만료시간이 짧은) 영구 쿠키
    await setCookie({ name: "userEmail", value: email, maxAge: 600 });

    const entryToken = await encrypt({ email, type: "ENTRY" });

    // 도메인을 생성
    const path = createChangePWDomain(entryToken);

    await sendEmail({ email, path });

    return success({ message: "이메일 발송에 성공하였습니다." });
  } catch (e) {
    return handleActionError(e);
  }
};
