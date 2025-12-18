"use server";

import { changePassword } from "@/domains/user";
import { APIRESPONSE } from "@/shared/types/api";
import { CustomError } from "@/shared/types/error";
import { actionHttpError } from "@/shared/utils/error";
import { PWConfirmSchema } from "@/shared/utils/validation/schema.auth";
import { cookies } from "next/headers";
import z from "zod";

// 유저가 비밀번호를 기억이 나지 않을때 로그인 하지 않은 상태에서 유저의 이메일의 비밀번호를 변경하는 컨트롤러
export const changeUserPW = async (
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE> => {
  try {
    const cookieStore = await cookies();

    const user = cookieStore.get("userEmail");

    if (!user) throw new CustomError("잠시 후 다시 시도해주세요", 500);

    const data = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const isParse = PWConfirmSchema.safeParse(data);

    if (!isParse.success) {
      const { fieldErrors } = z.flattenError(isParse.error);
      throw new CustomError("입력 값을 확인해주세요.", 401, fieldErrors);
    }

    const { password } = isParse.data;

    const userFound = await changePassword(user.value, password);
    if (!userFound) throw new CustomError("유저를 찾을 수가 없습니다.", 404);

    cookieStore.delete("userEmail");
    return {
      success: true,
      data: {
        message: "비밀번호 변경에 성공하였습니다.",
        payload: undefined,
      },
    };
  } catch (error) {
    return actionHttpError(error);
  }
};
