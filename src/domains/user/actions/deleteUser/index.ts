"use server";

import { decrypt } from "@/lib/token";
import { getAuthToken } from "@/domains/auth";
import { softDeleteUser } from "@/domains/user";
import { APIRESPONSE } from "@/shared/types";

export const deleteUser = async (
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE> => {
  /**
   * 계정 삭제 로직
   * 현재 유저 ID 를 formData 로 전달
   * token으로 userID를 payload로 꺼내서
   * db findOne UserId 를 가져오고
   * formData로 전달받은 유저 ID와 비교하여 일치 하였을때
   * user 의 isDelete를 true 로 변경
   */

  try {
    const userId = formData.get("userId") as string;

    if (!userId) {
      return {
        success: false,
        error: {
          code: 400,
          message: "사용자 ID를 입력해주세요.",
        },
      };
    }
    const token = await getAuthToken();
    const result = await decrypt({ token, type: "REFRESH" });

    if (userId !== result.payload?.userId) {
      return {
        success: false,
        error: {
          code: 403,
          message: " 사용자 ID가 일치하지 않습니다. 다시 시도해주세요.",
        },
      };
    }

    await softDeleteUser(result.payload.userId);

    return {
      success: true,
      data: {
        code: 200,
        message: "성공적으로 탈퇴처리 되었습니다.",
        payload: undefined,
      },
    };
  } catch (error) {
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
