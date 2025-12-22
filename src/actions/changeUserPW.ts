"use server";

import { changePassword } from "@/domains/user";
import { validateAndFlatten } from "@/shared/lib/validation";
import { ClientError, ServerError } from "@/shared/types/error";
import { APIRESPONSE } from "@/shared/types";

import { cookies } from "next/headers";
import { PWConfirmSchema } from "@/schemas/pwConfirm.schema";

// 유저가 비밀번호를 기억이 나지 않을때 로그인 하지 않은 상태에서 유저의 이메일의 비밀번호를 변경하는 컨트롤러
export const changeUserPW = async (
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE> => {
  try {
    const cookieStore = await cookies();

    const user = cookieStore.get("userEmail");

    if (!user) throw new ClientError("잠시 후 다시 시도해주세요", 500);

    const data = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const parsed = validateAndFlatten(PWConfirmSchema, data);

    if (!parsed.success) {
      throw new ClientError("입력 값을 확인해주세요.", 401, parsed.error);
    }

    const { password } = parsed.data;

    const userFound = await changePassword(user.value, password);
    if (!userFound) throw new ServerError("유저를 찾을 수가 없습니다.", 404);

    cookieStore.delete("userEmail");
    return {
      success: true,
      data: {
        message: "비밀번호가 성공적으로 변경되었습니다.",
        payload: undefined,
      },
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    const code =
      error instanceof ClientError || error instanceof ServerError
        ? error.code
        : 500;
    const fieldErrors =
      error instanceof ClientError ? error.errors : undefined;

    return {
      success: false,
      error: {
        code,
        message,
        fieldErrors,
      },
    };
  }
};

/**
 * FormData server action 함수에서 Error 나는 케이스
 *
 * - validation, Auth, 서버 에러
 *
 * - validtaion 과 Auth client 전달
 * - server 에러는 기록은 하되 client 에서는 단편화된 메세지 전달
 */
