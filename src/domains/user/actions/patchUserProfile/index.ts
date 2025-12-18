"use server";
import { decrypt } from "@/shared/lib/jose";
import { deleteAuthToken, getAuthToken } from "@/domains/auth";
import { updateUserEmail } from "@/domains/user";
import { APIRESPONSE } from "@/shared/types";

export const patchUserProfile = async (
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE<{ email: string }>> => {
  /**
   * 이메일과 password 를 받음
   * password 비교
   * 일치하면 이메일 업데이트
   * 성공하면 리다이렉트 profile
   * 실패하면 error 던져주기
   */

  try {
    const email = formData.get("email") as string;

    const token = await getAuthToken();
    const payload = await decrypt(token);
    const userEmail = await updateUserEmail({ id: payload.userId, email });
    return {
      success: true,
      data: {
        code: 200,
        message: "이메일이 성공적으로 변경되었습니다.",
        payload: userEmail,
      },
    };
  } catch (e) {
    await deleteAuthToken();
    const message =
      e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.";
    return {
      success: false,
      error: {
        code: 500,
        message,
      },
    };
  }
};
