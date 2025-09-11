"use server";
import { decrypt } from "@/lib/jose";
import { deleteAuthToken, getAuthToken } from "@/services/auth/token";
import { changePassword } from "@/services/user";
import { APIRESPONSE } from "@/types";

export const patchUserPassword = async (
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE> => {
  try {
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    const token = await getAuthToken();
    const payload = await decrypt(token);

    if (password !== passwordConfirm) {
      return {
        success: false,
        error: {
          code: 401,
          message: "비밀번호가 일치하지 않습니다.",
        },
      };
    }

    await changePassword(payload.userId, password);

    return {
      success: true,
      data: {
        code: 200,
        message: "비밀번호가 성공적으로 변경되었습니다.",
        payload: undefined,
      },
    };
  } catch (error) {
    await deleteAuthToken();
    const message =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";

    console.error(message);
    return {
      success: false,
      error: {
        code: 500,
        message,
      },
    };
  }
};
