"use server";

import { changePassword } from "@/services/user";
import { APIRESPONSE } from "@/types/api";
import { CustomError } from "@/types/error";
import { actionHttpError } from "@/utils/error";
import { PWConfirmSchema } from "@/utils/validation/schema.auth";
import z from "zod";

// 유저가 비밀번호를 기억이 나지 않을때 로그인 하지 않은 상태에서 유저의 이메일의 비밀번호를 변경하는 컨트롤러
export const changeUserPW = async (
  prev: unknown,
  formData: FormData,
  email: string,
): Promise<APIRESPONSE> => {
  try {
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

    const userFound = await changePassword(email, password);
    if (!userFound) throw new CustomError("유저를 찾을 수가 없습니다.", 404);

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
